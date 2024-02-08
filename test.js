// // パッケージの読み込み
// const mysql = require('mysql');

// // MySQL 接続設定
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Yonaha/2525',
//     database: 'sheetname',
// });

// // MySQL 接続
// connection.connect((err) => {
//   if (err) {
//     console.error('MySQL connection error:', err);
//     throw err;
//   }
//   console.log('Connected to MySQL database');
// });

// // クエリの実行（ここでは全てのデータを取得する例）
// const query = 'SELECT * FROM sheets';  // your_table_name には実際のテーブル名を指定する
// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error('Query error:', err);
//     throw err;
//   }

//   // 取得したデータを表示
//   console.log('Query result:', results);

//   // 接続の終了
//   connection.end();
// });

// const mysql = require('mysql2/promise');

// async function testDatabaseConnection() {
//   try {
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'Yonaha/2525',
//       database: 'sheetname',
//     });

//     const [rows] = await connection.execute('SELECT sheetId, sheetName FROM sheets');

//     if (rows.length > 0) {
//       console.log('Sheet IDs and Names from the database:');
//       rows.forEach((row) => {
//         console.log(`Sheet ID: ${row.sheetId}, Sheet Name: ${row.sheetName}`);
//       });
//     } else {
//       console.log('No data found in the sheets table.');
//     }

//     await connection.end();
//   } catch (error) {
//     console.error('Error testing database connection:', error);
//   }
// }

// // Call the function to test the database connection
// testDatabaseConnection();
// require('dotenv').config();
// const { App } = require('@slack/bolt');
// const cron = require('cron');

// // Slackボットのトークン
// const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;

// const app = new App({
//   token: SLACK_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

// // Cronジョブの設定 (毎朝7時)
// const afternoonCron = new cron.CronJob('7 14 * * *', async () => {
//   try {
//     // Slackにおはようメッセージを送信
//     const result = await app.client.chat.postMessage({
//       channel: '#graduation-task', // メッセージを送りたいチャンネルを指定
//       text: 'おはようございます！', // おはようメッセージの内容
//     });

//     console.log('Message sent:', result);
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// });

// // Cronジョブを開始
// afternoonCron.start();

// // Slackボットがメンションされたときのリアクション
// app.message(async ({ message, say }) => {
//   // 他のメッセージにも反応する場合は何か処理を追加できます
//   console.log(`Received a message: ${message.text}`);
// });

// // Slackボットを起動
// (async () => {
//   await app.start(3000);
//   console.log('⚡️ Bolt app is running!');
// })();


// // Slack APIトークンと必要なモジュールのインポート
// const { App } = require('@slack/bolt');
// const { WebClient } = require('@slack/web-api');

// const SLACK_TOKEN = 'xoxb-6112907660582-6196651190706-2NcGGSu6O5IESLrS7OW9Xet6'; // Slack ワークスペースのトークンに変更
// const SIGNING_SECRET = '83c0490a3de1bc9fd11a1e9ee17af659'; // ここにSigning Secretを設定

// const app = new App({
//   token: SLACK_TOKEN,
//   signingSecret: SIGNING_SECRET,
// });

// // スケジューラの設定
// const schedule = require('node-schedule');

// // メンバーに対してメッセージを送信する関数
// async function sendReminderMessage(channelId, userId) {
//   try {
//     // SlackのAPIを使用してメッセージを送信
//     const web = new WebClient(SLACK_TOKEN);
//     await web.chat.postMessage({
//       channel: channelId,
//       text: '今日は休みですか？',
//       user: userId,
//     });
//   } catch (error) {
//     console.error('Error sending reminder message:', error);
//   }
// }

// // メンバーの最終メッセージを確認し、条件が満たされた場合にメッセージを送信
// async function checkAndSendReminders(channelId) {
//   try {
//     // SlackのAPIを使用してチャンネルのメンバーの情報を取得
//     const result = await app.client.conversations.members({
//       channel: channelId,
//     });
//     const members = result.members;

//     // 今日の14時10分のタイムスタンプを取得
//     const todayAt1410 = new Date();
//     todayAt1410.setHours(14, 21, 0, 0);

//     // 各メンバーに対して処理を実行
//     members.forEach(async (memberId) => {
//       try {
//         // SlackのAPIを使用してメンバーの最終メッセージの情報を取得
//         const history = await app.client.conversations.history({
//           channel: channelId,
//           user: memberId,
//         });

//         // 最終メッセージの日時を取得
//         const lastMessageTimestamp = new Date(history.messages[0].ts * 1000);

//         // 条件を確認し、メッセージを送信
//         if (lastMessageTimestamp < todayAt1410) {
//           await sendReminderMessage(channelId, memberId);
//         }
//       } catch (error) {
//         console.error('Error processing member:', error);
//       }
//     });
//   } catch (error) {
//     console.error('Error getting members:', error);
//   }
// }

// // 14時10分にスケジュールされたジョブを作成
// const dailyJob = schedule.scheduleJob({ hour: 14, minute: 21 }, () => {
//   // 特定のチャンネルIDを指定してメッセージを送信
//   checkAndSendReminders('C06772JMJ9Y');
// });

// // Slackボットを起動
// (async () => {
//   await app.start(process.env.PORT || 3000);
//   console.log('⚡️ Bolt app is running!');
// })();


// // Slack APIトークンと必要なモジュールのインポート
// const { App } = require('@slack/bolt');
// const { WebClient } = require('@slack/web-api');

// const SLACK_TOKEN = 'xoxb-6112907660582-6196651190706-2NcGGSu6O5IESLrS7OW9Xet6'; // Slack ワークスペースのトークンに変更
// const SIGNING_SECRET = '83c0490a3de1bc9fd11a1e9ee17af659'; // ここにSigning Secretを設定
// const app = new App({
//   token: SLACK_TOKEN,
//   signingSecret: SIGNING_SECRET,
// });

// const web = new WebClient(SLACK_TOKEN);

// // スケジューラの設定
// const schedule = require('node-schedule');

// // メンバーに対してメッセージを送信する関数
// async function sendReminderMessage(userId) {
//   try {
//     // SlackのAPIを使用してメッセージを送信
//     await web.chat.postMessage({
//       channel: userId, // ユーザーIDを指定
//       text: '今日は休みですか？',
//     });
//   } catch (error) {
//     console.error('Error sending reminder message:', error);
//   }
// }

// // メンバーの最終メッセージを確認し、条件が満たされた場合にメッセージを送信
// async function checkAndSendReminders(channelId) {
//   try {
//     // SlackのAPIを使用してチャンネルのメンバーの情報を取得
//     const result = await app.client.conversations.members({
//       channel: channelId,
//     });
//     const members = result.members;

//     // 今日の14時10分のタイムスタンプを取得
//     const todayAt1410 = new Date();
//     todayAt1410.setHours(14, 28, 0, 0);

//     // 各メンバーに対して処理を実行
//     members.forEach(async (memberId) => {
//       try {
//         // SlackのAPIを使用してメンバーの最終メッセージの情報を取得
//         const history = await app.client.conversations.history({
//           channel: channelId,
//           user: memberId,
//         });

//         // 最終メッセージの日時を取得
//         const lastMessageTimestamp = new Date(history.messages[0].ts * 1000);

//         // 条件を確認し、メッセージを送信
//         if (lastMessageTimestamp < todayAt1410) {
//           await sendReminderMessage(memberId);
//         }
//       } catch (error) {
//         console.error('Error processing member:', error);
//       }
//     });
//   } catch (error) {
//     console.error('Error getting members:', error);
//   }
// }

// // 14時10分にスケジュールされたジョブを作成
// const dailyJob = schedule.scheduleJob({ hour: 14, minute: 28 }, () => {
//   // 特定のチャンネルIDを指定せずに、メッセージを送信
//   checkAndSendReminders('C06772JMJ9Y');
// });

// // Slackボットを起動
// (async () => {
//   await app.start(process.env.PORT || 3000);
//   console.log('⚡️ Bolt app is running!');
// })();



// // Slack APIトークンと必要なモジュールのインポート
// const { App } = require('@slack/bolt');
// const { WebClient } = require('@slack/web-api');

// const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
// const SIGNING_SECRET = '6dc6f56f66b717fc021d000c82d239e4'

// const app = new App({
//   token: SLACK_TOKEN,
//   signingSecret: SIGNING_SECRET,
// });

// const web = new WebClient(SLACK_TOKEN);

// // スケジューラの設定
// const schedule = require('node-schedule');

// // メンバーに対してメッセージを送信する関数
// async function sendReminderMessage(userId, text) {
//   try {
//     // SlackのAPIを使用してメッセージを送信
//     await web.chat.postMessage({
//       channel: userId, // ユーザーIDを指定
//       text,
//     });
//   } catch (error) {
//     console.error('Error sending reminder message:', error);
//   }
// }

// // メンバーの最終メッセージを確認し、指定された文字列が含まれていなければメッセージを送信
// async function checkAndSendReminders(channelId, searchString, reminderText) {
//   try {
//     // SlackのAPIを使用してチャンネルのメンバーの情報を取得
//     const result = await app.client.conversations.members({
//       channel: channelId,
//     });
//     const members = result.members;

//     // 今日の14時10分のタイムスタンプを取得
//     const todayAt1410 = new Date();
//     todayAt1410.setHours(15, 9, 0, 0);

//     // 各メンバーに対して処理を実行
//     members.forEach(async (memberId) => {
//       try {
//         // SlackのAPIを使用してメンバーの最終メッセージの情報を取得
//         const history = await app.client.conversations.history({
//           channel: channelId,
//           user: memberId,
//         });

//         // 最終メッセージの日時を取得
//         const lastMessageTimestamp = new Date(history.messages[0].ts * 1000);

//         // 最終メッセージが指定された文字列を含まない場合にメッセージを送信
//         if (lastMessageTimestamp < todayAt1410 && !history.messages[0].text.includes(searchString)) {
//           await sendReminderMessage(memberId, reminderText);
//         }
//       } catch (error) {
//         console.error('Error processing member:', error);
//       }
//     });
//   } catch (error) {
//     console.error('Error getting members:', error);
//   }
// }

// // 14時10分にスケジュールされたジョブを作成
// const dailyJob = schedule.scheduleJob({ hour: 15, minute: 9 }, () => {
//   // 特定のチャンネルIDを指定せずに、メッセージを送信
//   checkAndSendReminders('C067JQKRBKQ', '出席', '今日はまだ出席メッセージがありません。');
// });

// // Slackボットを起動
// (async () => {
//   await app.start(process.env.PORT || 3000);
//   console.log('⚡️ Bolt app is running!');
// })();
// const { App } = require('@slack/bolt');
// const express = require('express');
// const mysql = require('mysql');

// // Slack APIトークン
// const slackToken = 'xoxb-6112907660582-6196651190706-Pp7lRQclvklppBOHrBfThXJ1';

// // MySQLデータベース接続設定
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'Yonaha/2525',
//   database: 'sheetname',
// };

// const dbConnection = mysql.createConnection(dbConfig);

// const app = express();
// const port = 3001;

// // Slack Appの初期化
// const boltApp = new App({
//   token: slackToken,
//   signingSecret: '6dc6f56f66b717fc021d000c82d239e4', // ご自身のSlackアプリのSigning Secretに置き換えてください
// });

// // Slackイベントのリスナーを設定
// boltApp.message('出席', async ({ message, say }) => {
//   try {
//     // チャンネルのIDを取得
//     const channelId = message.channel;

//     // データベースから該当のチャンネルIDが存在するか確認
//     const query = `SELECT * FROM sheets WHERE channelId = '${channelId}'`;
//     dbConnection.query(query, (error, results) => {
//       if (error) {
//         throw error;
//       }

//       // データベースに該当のチャンネルIDが存在する場合
//       if (results.length > 0) {
//         say('OK');
//       } else {
//         say('NG'); // データベースに該当のチャンネルIDが存在しない場合
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// });

// // ExpressアプリケーションとしてSlackアプリを起動
// boltApp.start(port).then(() => {
//   console.log(`Server is running on port ${port}`);
// });


// require('dotenv').config();
// const { App } = require('@slack/bolt');
// const {
//   getAllSettingsFromDatabase,
//   getSettings,
//   getDateRow,
//   getSheetData,
//   updateSheetData,
//   updateSettingsFromDatabase,
// } = require('./sheet');

// const slackToken = process.env.SLACK_BOT_TOKEN;
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// const slackApp = new App({
//   token: slackToken,
//   signingSecret: slackSigningSecret,
// });

// // ユーザーごとに出席ステータスを管理するオブジェクト
// // 授業ごとの出席フラグを管理するオブジェクト
// const attendanceRecordsByClass = {
//   '1': {}, // 1コマ目
//   '2': {}, // 2コマ目
//   '3': {}, // 3コマ目
//   '4': {}, // 4コマ目
// };

// slackApp.message('出席', async ({ message, client }) => {
//   try {
//     const memberId = message.user;
//     const userProfile = await client.users.profile.get({
//       user: memberId,
//     });

//     const email = userProfile.profile.email;
//     const userName = extractUserName(email);
//     const dateRow = await getDateRow();
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     const minutes = currentTime.getMinutes();
//     const totalMinutes = hours * 60 + minutes;

//     // タイムレンジの定義
//     const timeRanges = [
//       { start: 9 * 60 + 20, end: 11 * 60 },   // 1コマ目の授業時間
//       { start: 11 * 60 + 10, end: 12 * 60 + 40 },  // 2コマ目の授業時間
//       { start: 13 * 60 + 50, end: 13 * 60 + 55 },    // 3コマ目の授業時間
//       { start: 13 * 60 + 56, end: 14 * 60},    // 4コマ目の授業時間
//     ];

//     // タイムレンジ内かどうかの判定
//     const isInTimeRange = timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);

//     if (message.text.trim().toLowerCase() !== '出席') {
//       return;
//     }

//     // 出席フラグを管理するオブジェクトを選択
//     const classIndex = getClassIndex(totalMinutes);
//     const classAttendanceRecords = attendanceRecordsByClass[classIndex];

//     if (!isInTimeRange || classAttendanceRecords[memberId]) {
//       // 時間外または既に出席済みの場合
//       let messageText = '今は打刻できません。';
//       if (classAttendanceRecords[memberId]) {
//         messageText = 'もう出席済みです！';
//       }

//       console.log(messageText);
//       await client.chat.postMessage({
//         channel: memberId,
//         text: messageText,
//       });
//       return;
//     }

//     // 出席処理
//     await handleAttendance(client, memberId, classAttendanceRecords, userName, currentTime, hours, minutes);
//   } catch (error) {
//     console.error('Slack イベントの処理中にエラーが発生しました:', error);
//   }
// });

// // 与えられた時刻に対応するコマのインデックスを取得
// function getClassIndex(totalMinutes) {
//   if (totalMinutes >= 9 * 60 + 20 && totalMinutes <= 11 * 60) {
//     return '1';
//   } else if (totalMinutes >= 11 * 60 + 10 && totalMinutes <= 12 * 60 + 40) {
//     return '2';
//   } else if (totalMinutes >= 13 * 60 + 50 && totalMinutes <= 13 * 60 + 55) {
//     return '3';
//   } else if (totalMinutes >= 13 * 60 + 56 && totalMinutes <= 14 * 60) {
//     return '4';
//   }
//   // 対応するコマがない場合は null またはエラー処理を行う
//   return null;
// }
// // タイムレンジ内かどうかの判定用の関数
// function isInTimeRange(totalMinutes, startMinutes, endMinutes) {
//   return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
// }

// async function initializeSettings() {
//   // settings オブジェクトの初期化
//   let settings = getSettings();

//   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
//     const sheetInfoList = await getAllSettingsFromDatabase();

//     if (sheetInfoList.length > 0) {
//       const { sheetId, sheetName } = sheetInfoList[0];
//       updateSettings(sheetId, sheetName);
//       settings = getSettings(); // settings を更新
//       console.log('データベースからの設定更新:', settings);
//     } else {
//       console.log('データベースからシート情報が取得できませんでした。');
//     }
//   }
// }

// function extractUserName(email) {
//   const atIndex = email.indexOf('@');
//   return email.substring(0, atIndex);
// }

// async function handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes) {
//   if (attendanceRecords[memberId]) {
//     await client.chat.postMessage({
//       channel: memberId,
//       text: 'もう出席済みです！',
//     });
//   } else {
//     const dateRow = await getDateRow();

//     if (dateRow !== null) {
//       const sheetData = await getSheetData(userName, dateRow);

//       if (sheetData) {
//         attendanceRecords[memberId] = true;

//         let attendanceMessage = `出席を確認しました。\n出席者: ${userName}\n時刻: ${hours}時${minutes}分`;

//         if ((hours === 9 && minutes >= 41 || hours >= 11) || (hours === 11 && minutes >= 21 || hours >= 12 && minutes <= 40) || (hours === 13 && minutes >= 30 || hours >= 13 && minutes <=40) || (hours === 15 && minutes >= 41 || hours >= 0 && minutes <= 20)) {
//           attendanceMessage += '\n遅刻です。ご注意ください。';
//           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 1);
//         } else {
//           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 2);
//         }

//         // シート名をメッセージに追加
//         const settings = getSettings();
//         attendanceMessage += `\nシート名: ${settings.subjectSheetName}`;

//         console.log('attendanceMessage', attendanceMessage);

//         await client.chat.postMessage({
//           channel: memberId,
//           text: attendanceMessage,
//         });
//       } else {
//         console.log('スプレッドシート内でユーザーが見つかりませんでした。');
//       }
//     } else {
//       console.log('スプレッドシート内で日付行が見つかりませんでした。');
//     }
//   }
// }

// (async () => {
//   await slackApp.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();






// const { App } = require('@slack/bolt');

// const app = new App({
//   token: 'xoxb-6112907660582-6196651190706-Pp7lRQclvklppBOHrBfThXJ1',
//   signingSecret: '6dc6f56f66b717fc021d000c82d239e4',
// });

// // ダイレクトメッセージに対する応答
// app.message(async ({ message, say }) => {
//   console.log('Received message event:', message);
//   if (message.channel_type === 'im') {
//     const userInfo = await app.client.users.info({
//       token: app.config.token,
//       user: message.user,
//     });

//     const userName = userInfo.user.profile.display_name || userInfo.user.name;

//     await say(`こんにちは、${userName}さん！ ダイレクトメッセージに "こんにちは" が届きました。`);
//   }
// });


// (async () => {
//   await app.start(3001);
//   console.log('Bot is running!');
// })();
// require('dotenv').config(); // .envファイルの読み込み

// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');
// const authorize = require('./authorize'); // 上記で提供されたauthorize関数のインポート
// const { google } = require('googleapis');

// // Slack関連の設定
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackBotToken = process.env.SLACK_BOT_TOKEN;
// const slackEvents = createEventAdapter(slackSigningSecret);
// const slackWebClient = new WebClient(slackBotToken);

// // データベース関連の設定
// const mysql = require('mysql2/promise');
// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// };

// // Slackのメッセージイベントのリッスン
// slackEvents.on('message', async (event) => {
//   try {
//     if (event.text === 'こんにちは') {
//       const connection = await mysql.createConnection(dbConfig);
//       const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [event.channel]);
//       connection.end();

//       if (rows.length > 0) {
//         const sheetId = rows[0].sheetId;
//         const sheetName = rows[0].sheetName;
//         const authClient = await authorize();
//         const sheets = google.sheets({ version: 'v4', auth: authClient });

//         const request = {
//           spreadsheetId: sheetId,
//           range: `${sheetName}!G8`,
//           valueInputOption: 'USER_ENTERED',
//           resource: {
//             values: [['こんにちは']]
//           }
//         };

//         await sheets.spreadsheets.values.update(request);
//         console.log('Successfully updated G8 cell in the specified sheet.');
//       } else {
//         console.log('No sheets found for the specified channel.');
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

// // SlackのイベントAPIを起動
// (async () => {
//   await slackEvents.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();

// require('dotenv').config(); // .envファイルの読み込み

// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');
// const authorize = require('./authorize'); // 上記で提供されたauthorize関数のインポート
// const { google } = require('googleapis');

// // Slack関連の設定
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackBotToken = process.env.SLACK_BOT_TOKEN;
// const slackEvents = createEventAdapter(slackSigningSecret);
// const slackWebClient = new WebClient(slackBotToken);

// // データベース関連の設定
// const mysql = require('mysql2/promise');
// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// };

// // Slackのメッセージイベントのリッスン
// slackEvents.on('message', async (event) => {
//   try {
//     if (event.text === 'こんにちは') {
//       // Slack APIを使用してメッセージを送信したユーザーの情報を取得
//       const userInfo = await slackWebClient.users.info({
//         user: event.user
//       });
//       const username = userInfo.user.real_name;

//       console.log('Searching for username:', username); // ログに検索しているユーザー名を表示

//       const connection = await mysql.createConnection(dbConfig);
//       const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [event.channel]);
//       connection.end();

//       if (rows.length > 0) {
//         const sheetId = rows[0].sheetId;
//         const sheetName = rows[0].sheetName;
//         const authClient = await authorize();
//         const sheets = google.sheets({ version: 'v4', auth: authClient });

//         // ユーザー名がA1からA30の範囲にあることを前提として、その範囲を指定して取得
//         const response = await sheets.spreadsheets.values.get({
//           spreadsheetId: sheetId,
//           range: `${sheetName}!A1:A30`,
//         });
//         const values = response.data.values;
//         let userRowIndex = -1;
//         if (values) {
//           for (let i = 0; i < values.length; i++) {
//             if (values[i][0] === username) {
//               userRowIndex = i + 1; // Google Sheetsの行番号は1から始まるため、+1しています
//               break;
//             }
//           }
//         }

//         if (userRowIndex !== -1) {
//           // 該当する行の隣の列（G列）に「こんにちは」と書き込み
//           const request = {
//             spreadsheetId: sheetId,
//             range: `${sheetName}!G${userRowIndex}`,
//             valueInputOption: 'USER_ENTERED',
//             resource: {
//               values: [['こんにちは']]
//             }
//           };

//           await sheets.spreadsheets.values.update(request);
//           console.log('Successfully updated G column in the specified sheet.');
//         } else {
//           console.log('Username not found in the specified sheet.');
//         }
//       } else {
//         console.log('No sheets found for the specified channel.');
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

// // SlackのイベントAPIを起動
// (async () => {
//   await slackEvents.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();

// require('dotenv').config(); // .envファイルの読み込み

// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');
// const authorize = require('./authorize'); // 上記で提供されたauthorize関数のインポート
// const { google } = require('googleapis');

// // Slack関連の設定
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackBotToken = process.env.SLACK_BOT_TOKEN;
// const slackEvents = createEventAdapter(slackSigningSecret);
// const slackWebClient = new WebClient(slackBotToken);

// // データベース関連の設定
// const mysql = require('mysql2/promise');
// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// };

// // Googleシートへの書き込み関数
// async function writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, value) {
//   try {
//     // 指定されたセルに値を書き込む
//     const request = {
//       spreadsheetId: sheetId,
//       range: `${sheetName}!${String.fromCharCode(65 + columnIndex)}${userRowIndex}`,
//       valueInputOption: 'USER_ENTERED',
//       resource: {
//         values: [[value]]
//       }
//     };

//     await sheets.spreadsheets.values.update(request);
//     console.log(`Successfully updated cell with "${value}" in the specified sheet.`);
//   } catch (error) {
//     console.error('Error writing to Google Sheet:', error);
//   }
// }

// // Slackのメッセージイベントのリッスン
// slackEvents.on('message', async (event) => {
//   try {
//     if (event.text === '出席') {
//       // Slack APIを使用してメッセージを送信したユーザーの情報を取得
//       const userInfo = await slackWebClient.users.info({
//         user: event.user
//       });
//       const username = userInfo.user.real_name;

//       console.log('Searching for username:', username); // ログに検索しているユーザー名を表示

//       const connection = await mysql.createConnection(dbConfig);
//       const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [event.channel]);
//       connection.end();

//       console.log('Database result:', rows); // データベースから取得した情報をログに表示

//       if (rows.length > 0) {
//         const sheetId = rows[0].sheetId;
//         const sheetName = rows[0].sheetName;
//         const authClient = await authorize();
//         const sheets = google.sheets({ version: 'v4', auth: authClient });

//         // シートのB1:Y1の日付を取得
//         const response = await sheets.spreadsheets.values.get({
//           spreadsheetId: sheetId,
//           range: `${sheetName}!B1:Y1`,
//         });
//         const sheetDates = response.data.values[0]; // 1行目の日付を取得

//         // 本日の日付と一致する日付があるか検索
//         const today = new Date();
//         let columnIndex = -1;
//         for (let i = 0; i < sheetDates.length; i++) {
//           if (compareDates(today, sheetDates[i])) {
//             columnIndex = i + 1; // B列から始まるため、インデックス+1
//             break;
//           }
//         }

//         if (columnIndex !== -1) {
//           const authClient = await authorize();
//           const sheets = google.sheets({ version: 'v4', auth: authClient });

//           const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: sheetId,
//             range: `${sheetName}!A1:A35`,
//           });
//           const values = response.data.values;
//           let userRowIndex = -1;
//           if (values) {
//             for (let i = 0; i < values.length; i++) {
//               if (values[i][0] === username) {
//                 userRowIndex = i + 1; // Google Sheetsの行番号は1から始まるため、+1しています
//                 break;
//               }
//             }
//           }

//           if (userRowIndex !== -1) {
//             // Googleシートに2の値を書き込み（出席）
//             await writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, 2);

//             // メッセージをボットのチャンネルに送信
//             const botChannel = 'D065L0A4BQE'; // ボットのチャンネルIDを.envファイルから取得
//             await slackWebClient.chat.postMessage({
//               channel: botChannel,
//               text: `ユーザー ${username} が「出席」と入力しました。`,
//             });
//           } else {
//             console.log('Username not found in the specified sheet.');
//           }
//         } else {
//           console.log('Today\'s date not found in the specified sheet.');
//         }
//       } else {
//         console.log('No sheets found for the specified channel.');
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

// // 今日の日付を取得して、シートの日付と比較する関数
// function compareDates(today, sheetDate) {
//   const [sheetMonth, sheetDay] = sheetDate.split('/').map(Number); // シートの日付を月と日に分割し、数値に変換する
//   const todayMonth = today.getMonth() + 1; // 今日の月
//   const todayDay = today.getDate(); // 今日の日

//   return sheetMonth === todayMonth && sheetDay === todayDay;
// }

// // SlackのイベントAPIを起動
// (async () => {
//   await slackEvents.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();


// require('dotenv').config(); // .envファイルの読み込み

// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');
// const authorize = require('./authorize'); // 上記で提供されたauthorize関数のインポート
// const { google } = require('googleapis');

// // Slack関連の設定
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackBotToken = process.env.SLACK_BOT_TOKEN;
// const slackEvents = createEventAdapter(slackSigningSecret);
// const slackWebClient = new WebClient(slackBotToken);

// // データベース関連の設定
// const mysql = require('mysql2/promise');
// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// };

// // Googleシートへの書き込み関数
// async function writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, value) {
//   try {
//     // 指定されたセルに値を書き込む
//     const request = {
//       spreadsheetId: sheetId,
//       range: `${sheetName}!${String.fromCharCode(65 + columnIndex)}${userRowIndex}`,
//       valueInputOption: 'USER_ENTERED',
//       resource: {
//         values: [[value]] // 出席をそのままシートに記録
//       }
//     };

//     await sheets.spreadsheets.values.update(request);
//     console.log(`Successfully updated cell with "${value}" in the specified sheet.`);
//   } catch (error) {
//     console.error('Error writing to Google Sheet:', error);
//   }
// }

// // Slackのメッセージイベントのリッスン
// slackEvents.on('message', async (event) => {
//   try {
//     // メッセージの送信者がボット自身である場合は処理しない
//     if (event.subtype === 'bot_message') return;

//     // メッセージのテキストを取得
//     const messageText = event.text.trim().toLowerCase();

//     // 「出席」というメッセージが送信された場合の処理
//     if (messageText === '出席') {
//       // Slack APIを使用してメッセージを送信したユーザーの情報を取得
//       const userInfo = await slackWebClient.users.info({
//         user: event.user
//       });
//       const username = userInfo.user.real_name;

//       console.log('Searching for username:', username); // ログに検索しているユーザー名を表示

//       // データベースからシート情報を取得
//       const connection = await mysql.createConnection(dbConfig);
//       const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [event.channel]);
//       connection.end();

//       console.log('Database result:', rows); // データベースから取得した情報をログに表示

//       if (rows.length > 0) {
//         const sheetId = rows[0].sheetId;
//         const sheetName = rows[0].sheetName;
//         const authClient = await authorize();
//         const sheets = google.sheets({ version: 'v4', auth: authClient });

//         // シートのB1:Y1の日付を取得
//         const response = await sheets.spreadsheets.values.get({
//           spreadsheetId: sheetId,
//           range: `${sheetName}!B1:Y1`,
//         });
//         const sheetDates = response.data.values[0]; // 1行目の日付を取得

//         // 本日の日付と一致する日付があるか検索
//         const today = new Date();
//         let columnIndex = -1;
//         for (let i = 0; i < sheetDates.length; i++) {
//           if (compareDates(today, sheetDates[i])) {
//             columnIndex = i + 1; // B列から始まるため、インデックス+1
//             break;
//           }
//         }

//         if (columnIndex !== -1) {
//           // 出席時間帯かどうかを判定
//           const isInTimeRange = checkTimeRange();

//           if (isInTimeRange) {
//             const authClient = await authorize();
//             const sheets = google.sheets({ version: 'v4', auth: authClient });

//             const response = await sheets.spreadsheets.values.get({
//               spreadsheetId: sheetId,
//               range: `${sheetName}!A1:A35`,
//             });
//             const values = response.data.values;
//             let userRowIndex = -1;
//             if (values) {
//               for (let i = 0; i < values.length; i++) {
//                 if (values[i][0] === username) {
//                   userRowIndex = i + 1; // Google Sheetsの行番号は1から始まるため、+1しています
//                   break;
//                 }
//               }
//             }

//             if (userRowIndex !== -1) {
//               // Googleシートに2の値を書き込み（出席）
//               await writeToSheet(sheets, sheetId, sheetName, userRowIndex, columnIndex, 2);

//               // メッセージをボットのチャンネルに送信
//               const botChannel = 'D065L0A4BQE'; // ボットのチャンネルIDを.envファイルから取得
//               await slackWebClient.chat.postMessage({
//                 channel: botChannel,
//                 text: `ユーザー ${username} が「出席」と入力しました。`,
//               });
//             } else {
//               console.log('Username not found in the specified sheet.');
//             }
//           } else {
//             // 時間外の場合のメッセージを送信
//             console.log('Attendance outside of the designated time range.');
//             await slackWebClient.chat.postMessage({
//               channel: event.channel,
//               text: '現在は出席できません。指定された時間帯内で出席してください。',
//             });
//           }
//         } else {
//           console.log('Today\'s date not found in the specified sheet.');
//         }
//       } else {
//         console.log('No sheets found for the specified channel.');
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

// // 指定された時刻が出席時間帯内かどうかを判定する関数
// function checkTimeRange() {
//   const currentTime = new Date();
//   const hours = currentTime.getHours();
//   const minutes = currentTime.getMinutes();
//   const totalMinutes = hours * 60 + minutes;

//   // タイムレンジの定義
//   const timeRanges = [
//     { start: 7 * 60 + 30, end: 11 * 60 },   // 1コマ目の授業時間
//     { start: 11 * 60 + 10, end: 12 * 60 + 40 },  // 2コマ目の授業時間
//     { start: 13 * 60 + 50, end: 15 * 60 + 20 },    // 3コマ目の授業時間
//     { start: 15 * 60 + 30, end: 17 * 60 },    // 4コマ目の授業時間
//   ];

//   // タイムレンジ内かどうかの判定
//   return timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);
// }

// // 今日の日付を取得して、シートの日付と比較する関数
// function compareDates(today, sheetDate) {
//   const [sheetMonth, sheetDay] = sheetDate.split('/').map(Number); // シートの日付を月と日に分割し、数値に変換する
//   const todayMonth = today.getMonth() + 1; // 今日の月
//   const todayDay = today.getDate(); // 今日の日

//   return sheetMonth === todayMonth && sheetDay === todayDay;
// }

// // SlackのイベントAPIを起動
// (async () => {
//   await slackEvents.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();

require('dotenv').config(); // .envファイルの読み込み

const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const authorize = require('./authorize'); // 上記で提供されたauthorize関数のインポート
const { google } = require('googleapis');

// Slack関連の設定
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackWebClient = new WebClient(slackBotToken);

// データベース関連の設定
const mysql = require('mysql2/promise');
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

// 時間帯の定義
const timeSlots = [
  { name: '1コマ目', startTime: '09:30', endTime: '11:00', lateTime: '09:40', attendanceLimit: 1 },
  { name: '2コマ目', startTime: '11:10', endTime: '12:40', lateTime: '11:10', attendanceLimit: 1 },
  { name: '3コマ目', startTime: '13:50', endTime: '15:20', lateTime: '14:00', attendanceLimit: 1 },
  { name: '4コマ目', startTime: '15:30', endTime: '16:00', lateTime: '15:40', attendanceLimit: 1 }
];

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
