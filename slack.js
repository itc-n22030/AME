
// slack.js

const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { google } = require('googleapis');
const mysql = require('mysql2/promise');
const authorize = require('./authorize');

const { getSheetInfo, dbConfig } = require('./sheet'); // dbConfig を追加

const timeSlots = [
  { name: '1コマ目', startTime: '09:30', endTime: '11:00', lateTime: '09:40', attendanceLimit: 1 },
  { name: '2コマ目', startTime: '11:10', endTime: '12:40', lateTime: '11:10', attendanceLimit: 1 },
  { name: '3コマ目', startTime: '13:50', endTime: '15:20', lateTime: '14:00', attendanceLimit: 1 },
  { name: '4コマ目', startTime: '15:30', endTime: '17:00', lateTime: '15:40', attendanceLimit: 1 }
];
// Slack関連の設定
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackWebClient = new WebClient(slackBotToken);

// Slackのメッセージイベントのリッスン
// Googleシートへの書き込み関数
async function writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, value) {
  try {
    // 指定されたセルの値を取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!${String.fromCharCode(65 + columnIndex)}${userRowIndex}`,
    });
    const currentValue = parseInt(response.data.values[0][0]) || 0; // 現在の値を取得し、数値に変換

    // 値を加算して更新
    const newValue = currentValue + value;
    const request = {
      spreadsheetId: sheetId,
      range: `${sheetName}!${String.fromCharCode(65 + columnIndex)}${userRowIndex}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[newValue.toString()]] // 新しい値を文字列として設定
      }
    };

    await sheets.spreadsheets.values.update(request);
    console.log(`Successfully updated cell with "${newValue}" in the specified sheet.`);
  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
  }
}
const attendanceCounts = {};

// Slackのメッセージイベントのリッスン
const userAttendanceRecords = {};

// Slackのメッセージイベントのリッスン
slackEvents.on('message', async (event) => {
  try {
    if (event.text.trim().toLowerCase() !== '出席') {
      return;
    }

    // 現在時刻の取得
    const currentTime = new Date().toLocaleTimeString('ja-JP', { hour12: false, hour: '2-digit', minute: '2-digit' });

    // 時間帯の判定
    let currentSlot = null; // 現在の時間帯
    let isLate = false; // 遅刻フラグ
    let lateTime = ''; // 遅刻開始時刻
    for (const slot of timeSlots) {
      if (currentTime >= slot.startTime && currentTime <= slot.endTime) {
        currentSlot = slot;
        if (currentTime > slot.lateTime) {
          isLate = true;
          lateTime = slot.lateTime;
        }
        break;
      }
    }

    if (!currentSlot) {
      // 時間外のメッセージを送信
      const botChannel = 'D065L0A4BQE'; // ボットのチャンネルIDを.envファイルから取得
      await slackWebClient.chat.postMessage({
        channel: event.user, // ユーザーにダイレクトメッセージとして送信
        text: `時間外です。現在の時間帯では出席は受け付けていません。`,
      });
      return;
    }

    // Slack APIを使用してメッセージを送信したユーザーの情報を取得
    const userInfo = await slackWebClient.users.info({
      user: event.user
    });
    const username = userInfo.user.real_name;

    console.log('Searching for username:', username); // ログに検索しているユーザー名を表示

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [event.channel]);
    connection.end();

    console.log('Database result:', rows); // データベースから取得した情報をログに表示

    if (rows.length > 0) {
      const sheetId = rows[0].sheetId;
      const sheetName = rows[0].sheetName;
      const authClient = await authorize();
      const sheets = google.sheets({ version: 'v4', auth: authClient });

      // シートのB1:Y1の日付を取得
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheetName}!B1:Y1`,
      });
      const sheetDates = response.data.values[0]; // 1行目の日付を取得

      // 本日の日付と一致する日付があるか検索
      const today = new Date();
      let columnIndex = -1;
      for (let i = 0; i < sheetDates.length; i++) {
        if (compareDates(today, sheetDates[i])) {
          columnIndex = i + 1; // B列から始まるため、インデックス+1
          break;
        }
      }

      if (columnIndex !== -1) {
        const authClient = await authorize();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: `${sheetName}!A1:A35`,
        });
        const values = response.data.values;
        let userRowIndex = -1;
        if (values) {
          for (let i = 0; i < values.length; i++) {
            if (values[i][0] === username) {
              userRowIndex = i + 1; // Google Sheetsの行番号は1から始まるため、+1しています
              break;
            }
          }
        }

        if (userRowIndex !== -1) {
          // 既に出席したかどうかを確認
          const responseForSlot = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}!${String.fromCharCode(65 + columnIndex)}${userRowIndex}`,
          });
          const currentSlotValue = parseInt(responseForSlot.data.values[0][0]) || 0;
          if (currentSlotValue === 1) {
            // 既に出席済みの場合
            await slackWebClient.chat.postMessage({
              channel: event.user, // ユーザーにダイレクトメッセージとして送信
              text: `すでに ${currentSlot.name} に出席しています。`,
            });
            return;
          }
        
          // 出席回数の管理
          if (!attendanceCounts[currentSlot.name]) {
            attendanceCounts[currentSlot.name] = 0;
          }
          if (attendanceCounts[currentSlot.name] >= currentSlot.attendanceLimit) {
            // 出席回数の上限に達した場合
            await slackWebClient.chat.postMessage({
              channel: event.user, // ユーザーにダイレクトメッセージとして送信
              text: `${currentSlot.name} の出席回数の上限に達しています。`,
            });
            return;
          }
          attendanceCounts[currentSlot.name]++;
        
          // ユーザーごとの出席記録を更新
          if (!userAttendanceRecords[username]) {
            userAttendanceRecords[username] = [];
          }
          userAttendanceRecords[username].push(currentSlot.name);
        
          // Googleシートに遅刻か出席の値を書き込み
          const valueToWrite = isLate ? 1 : 2;
        
          await writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, valueToWrite);
        
          // ユーザー名、時間、シート名を含むメッセージをボットへのダイレクトメッセージに送信
          const directMessageChannel = await slackWebClient.conversations.open({
            users: event.user, // ダイレクトメッセージを送るユーザーのID
          });
          await slackWebClient.chat.postMessage({
            channel: directMessageChannel.channel.id,
            text: `出席を確認しました。\nユーザー名：${username}\n時間：${currentTime}\nシート名：${sheetName}${isLate ? '\n遅刻です。気を付けて。' : ''}`,
          });
        

          // 3日間連続で出席していないユーザーをチェック
          if (userAttendanceRecords[username].length >= 3) {
            const lastThreeDaysAttendance = userAttendanceRecords[username].slice(-3);
            const uniqueDays = new Set(lastThreeDaysAttendance);
            if (uniqueDays.size === 1) {
              // 3日間連続で同じ時間帯に出席していない場合
              await slackWebClient.chat.postMessage({
                channel: event.user, // ユーザーにダイレクトメッセージとして送信
                text: `3日間連続で同じ時間帯に出席していません。`,
              });
            }
          }
        } else {
          console.log('Username not found in the specified sheet.');
        }
      } else {
        console.log('Today\'s date not found in the specified sheet.');
      }
    } else {
      console.log('No sheets found for the specified channel.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// 今日の日付を取得して、シートの日付と比較する関数
function compareDates(today, sheetDate) {
  const [sheetMonth, sheetDay] = sheetDate.split('/').map(Number); // シートの日付を月と日に分割し、数値に変換する
  const todayMonth = today.getMonth() + 1; // 今日の月
  const todayDay = today.getDate(); // 今日の日

  return sheetMonth === todayMonth && sheetDay === todayDay;
}

// SlackのイベントAPIを起動
(async () => {
  await slackEvents.start(3001);
  console.log('⚡️ Bolt app is running on port 3001!');
})();
