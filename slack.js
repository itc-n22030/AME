// // // slack.js
// // const { App } = require('@slack/bolt');
// // const { getAllSettingsFromDatabase, getSettings, getDateRow, getSheetData, updateSheetData, updateSettingsFromDatabase } = require('./sheet');
// // const slackToken = 'xoxb-6112907660582-6196651190706-2NcGGSu6O5IESLrS7OW9Xet6';
// // const slackSigningSecret = '83c0490a3de1bc9fd11a1e9ee17af659';

// // const slackApp = new App({
// //   token: slackToken,
// //   signingSecret: slackSigningSecret,
// // });

// // const attendanceRecords = {};

// // slackApp.message('合計', async ({ message, client }) => {
// //   try {
// //     const memberId = message.user;
// //     const userProfile = await client.users.profile.get({
// //       user: memberId,
// //     });

// //     const email = userProfile.profile.email;
// //     const userName = extractUserName(email);
// //     const messageText = message.text;

// //     if (messageText.includes('シート名') && messageText.includes('合計')) {
     

// //       if (settings.sheetNames.includes(sheetName)) {
// //         const sum = await calculateSheetSum(sheetName, parseInt(startRow), parseInt(endRow), parseInt(columnIndex));

// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: `合計: ${sum}`,
// //         });
// //       } else {
// //         console.log('無効なシート名です。');
// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: '無効なシート名です。',
// //         });
// //       }
// //     } else {
// //       console.log('無効なメッセージ形式です。');
// //       await client.chat.postMessage({
// //         channel: memberId,
// //         text: 'メッセージの形式が無効です。',
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// //   }
// // });

// // const { App } = require('@slack/bolt');
// // const { getAllSettingsFromDatabase, getSettings, getDateRow, getSheetData, updateSheetData, updateSettingsFromDatabase } = require('./sheet');

// // const slackToken = 'xoxb-6112907660582-6196651190706-2NcGGSu6O5IESLrS7OW9Xet6';
// // const slackSigningSecret = '83c0490a3de1bc9fd11a1e9ee17af659';

// // const slackApp = new App({
// //   token: slackToken,
// //   signingSecret: slackSigningSecret,
// // });

// // const attendanceRecords = {};

// // slackApp.message('合計', async ({ message, client }) => {
// //   try {
// //     const memberId = message.user;
// //     const userProfile = await client.users.profile.get({
// //       user: memberId,
// //     });

// //     const email = userProfile.profile.email;
// //     const userName = extractUserName(email);
// //     const messageText = message.text;

// //     if (messageText.includes('シート名') && messageText.includes('合計')) {
// //       const sheetInfoList = await getAllSettingsFromDatabase();

// //       for (const sheetInfo of sheetInfoList) {
// //         const { sheetId, sheetName } = sheetInfo;
// //         const sum = await calculateSheetSum(sheetName, parseInt(startRow), parseInt(endRow), parseInt(columnIndex));

// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: `合計(${sheetName}): ${sum}`,
// //         });
// //       }
// //     } else {
// //       console.log('無効なメッセージ形式です。');
// //       await client.chat.postMessage({
// //         channel: memberId,
// //         text: 'メッセージの形式が無効です。',
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// //   }
// // });
// // // slackApp.message('出席', async ({ message, client }) => {
// // //   try {
// // //     const memberId = message.user;
// // //     const userProfile = await client.users.profile.get({
// // //       user: memberId,
// // //     });

// // //     const email = userProfile.profile.email;
// // //     const userName = extractUserName(email);
// // //     const dateRow = await getDateRow();
// // //     const currentTime = new Date();
// // //     const hours = currentTime.getHours();
// // //     const minutes = currentTime.getMinutes();
// // //     const totalMinutes = hours * 60 + minutes;

// // //     const timeRanges = [
// // //       { start: 1 * 60 + 0, end: 11 * 60 },
// // //       { start: 11 * 60 + 10, end: 12 * 60 + 40 }, // 2コマ目の終了時間を修正
// // //       { start: 13 * 60 + 50, end: 15 * 60 + 20 }, // 3コマ目の開始時間と終了時間を修正
// // //       { start: 15 * 60 + 30, end: 17 * 60 },
// // //     ];

// // //     const isInTimeRange = timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);

// // //     if (message.text.includes('出席') && isInTimeRange) {

// // //       await handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes);
// // //     } else {
// // //       console.log('指定された時間範囲外です。');
// // //       await client.chat.postMessage({
// // //         channel: memberId,
// // //         text: '現在は打刻時間外ですよ。',
// // //       });
// // //     }
// // //   } catch (error) {
// // //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// // //   }
// // // });

// // slackApp.message('出席', async ({ message, client }) => {
// //   try {
// //     const memberId = message.user;
// //     const userProfile = await client.users.profile.get({
// //       user: memberId,
// //     });

// //     const email = userProfile.profile.email;
// //     const userName = extractUserName(email);
// //     const dateRow = await getDateRow();
// //     const currentTime = new Date();
// //     const hours = currentTime.getHours();
// //     const minutes = currentTime.getMinutes();
// //     const totalMinutes = hours * 60 + minutes;

// //     const timeRanges = [
// //       { start: 1 * 60 + 10, end: 11 * 60 },
// //       { start: 11 * 60 + 10, end: 12 * 60 + 40 },
// //       { start: 13 * 60 + 50, end: 15 * 60 + 20 },
// //       { start: 15 * 60 + 30, end: 17 * 60 },
// //     ];

// //     const isInTimeRange = timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);

// //     // message.text が「出席」以外の文字も含まれている場合は無視
// //     if (message.text.trim().toLowerCase() !== '出席' || !isInTimeRange) {
// //       console.log('指定された条件に合致しないメッセージは無視します。');
// //       return;
// //     }

// //     await handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes);

// //   } catch (error) {
// //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// //   }
// // });

// // // async function initializeSettings() {
// // //   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
// // //     const sheetInfoList = await getAllSettingsFromDatabase();
// // //     if (sheetInfoList && sheetInfoList.length > 0) {
// // //       // ここでは最初の行を使用していますが、実際のアプリケーションに応じて適切なシート情報を選択してください
// // //       const { sheetId, sheetName } = sheetInfoList[0];
// // //       settings = {
// // //         spreadsheetId: sheetId,
// // //         subjectSheetName: sheetName,
// // //       };
// // //       console.log('データベースからの設定更新:', settings);
// // //     } else {
// // //       console.log('データベースからシート情報が取得できませんでした。');
// // //     }
// // //   }
// // // }

// // // async function initializeSettings() {
// // //   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
// // //     const sheetInfoList = await getAllSettingsFromDatabase();

// // //     if (sheetInfoList && sheetInfoList.length > 0) {
// // //       // ここでは最初の行を使用していますが、実際のアプリケーションに応じて適切なシート情報を選択してください
// // //       const { sheetId, sheetName } = sheetInfoList[0];
// // //       updateSettings(sheetId, sheetName);
// // //       console.log('データベースからの設定更新:', getSettings());
// // //     } else {
// // //       console.log('データベースからシート情報が取得できませんでした。');
// // //     }
// // //   }
// // // }

// // async function initializeSettings() {
// //   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
// //     const sheetInfoList = await getAllSettingsFromDatabase();

// //     if (sheetInfoList.length > 0) {
// //       // プロジェクトによっては必要に応じて適切な方法でシート情報を選択する必要があります。
// //       // 以下は最初のシート情報を選択する例です。
// //       const { sheetId, sheetName } = sheetInfoList[0];
// //       updateSettings(sheetId, sheetName);
// //       console.log('データベースからの設定更新:', getSettings());
// //     } else {
// //       console.log('データベースからシート情報が取得できませんでした。');
// //     }
// //   }
// // }
// // function extractUserName(email) {
// //   const atIndex = email.indexOf('@');
// //   return email.substring(0, atIndex);
// // }

// // // async function handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes) {
// // //   if (attendanceRecords[memberId]) {
// // //     await client.chat.postMessage({
// // //       channel: memberId,
// // //       text: 'もう出席済みです！',
// // //     });
// // //   } else {
// // //     const dateRow = await getDateRow();

// // //     if (dateRow !== null) {
// // //       const sheetData = await getSheetData(userName, dateRow);

// // //       if (sheetData) {
// // //         attendanceRecords[memberId] = true;

// // //         let attendanceMessage = `出席を確認しました。\n出席者: ${userName}\n時刻: ${hours}時${minutes}分`;

// // //         if ((hours === 9 && minutes >= 41) || (hours === 11 && minutes >= 21) || (hours === 14 && minutes >= 11) || (hours === 15 && minutes >= 41)) {
// // //   attendanceMessage += '\n遅刻です。ご注意ください。';
// // //   await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 1);
// // // } else {
// // //   await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 2);
// // // }

// // //         console.log('attendanceMessage', attendanceMessage);



// // //         await client.chat.postMessage({
// // //           channel: memberId,
// // //           text: attendanceMessage,
// // //         });
// // //       } else {
// // //         console.log('スプレッドシート内でユーザーが見つかりませんでした。');
// // //       }
// // //     } else {
// // //       console.log('スプレッドシート内で日付行が見つかりませんでした。');
// // //     }
// // //   }
// // // }


// // async function handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes) {
// //   if (attendanceRecords[memberId]) {
// //     await client.chat.postMessage({
// //       channel: memberId,
// //       text: 'もう出席済みです！',
// //     });
// //   } else {
// //     const dateRow = await getDateRow();

// //     if (dateRow !== null) {
// //       const sheetData = await getSheetData(userName, dateRow);

// //       if (sheetData) {
// //         attendanceRecords[memberId] = true;

// //         let attendanceMessage = `出席を確認しました。\n出席者: ${userName}\n時刻: ${hours}時${minutes}分`;

// //         if ((hours === 9 && minutes >= 41) || (hours === 11 && minutes >= 21) || (hours === 14 && minutes >= 11) || (hours === 15 && minutes >= 41)) {
// //           attendanceMessage += '\n遅刻です。ご注意ください。';
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 1);
// //         } else {
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 2);
// //         }

// //         // シート名をメッセージに追加
// //         const settings = getSettings();
// //         attendanceMessage += `\nシート名: ${settings.subjectSheetName}`;

// //         console.log('attendanceMessage', attendanceMessage);

// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: attendanceMessage,
// //         });
// //       } else {
// //         console.log('スプレッドシート内でユーザーが見つかりませんでした。');
// //       }
// //     } else {
// //       console.log('スプレッドシート内で日付行が見つかりませんでした。');
// //     }
// //   }
// // }


// // (async () => {
// //   await slackApp.start(3001);
// //   console.log('⚡️ Bolt app is running on port 3001!');
// // })();



// //slack.js//
// // require('dotenv').config();
// // const { App } = require('@slack/bolt');
// // const { getAllSettingsFromDatabase, getSettings, getDateRow, getSheetData, updateSheetData, updateSettingsFromDatabase } = require('./sheet');

// // const slackToken = process.env.SLACK_BOT_TOKEN;
// // const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// // const slackApp = new App({
// //   token: slackToken,
// //   signingSecret: slackSigningSecret,
// // });

// // const attendanceRecords = {};

// // // slackApp.message('合計', async ({ message, client }) => {
// // //   try {
// // //     const memberId = message.user;
// // //     const userProfile = await client.users.profile.get({
// // //       user: memberId,
// // //     });

// // //     const email = userProfile.profile.email;
// // //     const userName = extractUserName(email);
// // //     const messageText = message.text;

// // //     if (messageText.includes('シート名') && messageText.includes('合計')) {
// // //       const sheetInfoList = await getAllSettingsFromDatabase();

// // //       for (const sheetInfo of sheetInfoList) {
// // //         const { sheetId, sheetName } = sheetInfo;

// // //         // 変更点: ユーザーIDと合計を取得する関数を呼び出す
// // //         const { userId, total } = await getUserIdAndTotal(userName, sheetId, sheetName);

// // //         await client.chat.postMessage({
// // //           channel: memberId,
// // //           text: `合計(${sheetName}): ${total}, ユーザーID: ${userId}`,
// // //         });
// // //       }
// // //     } else {
// // //       console.log('無効なメッセージ形式です。');
// // //       await client.chat.postMessage({
// // //         channel: memberId,
// // //         text: 'メッセージの形式が無効です。',
// // //       });
// // //     }
// // //   } catch (error) {
// // //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// // //   }
// // // });

// // // slackApp.message('合計', async ({ message, client }) => {
// // //   try {
// // //     const memberId = message.user;
// // //     const userProfile = await client.users.profile.get({
// // //       user: memberId,
// // //     });

// // //     const email = userProfile.profile.email;
// // //     const userName = extractUserName(email);
// // //     const messageText = message.text;

// // //     if (messageText.includes('シート名') && messageText.includes('合計')) {
// // //       const sheetInfoList = await getAllSettingsFromDatabase();

// // //       for (const sheetInfo of sheetInfoList) {
// // //         const { sheetId, sheetName } = sheetInfo;

// //         // 変更点: ユーザーIDと合計を取得する関数を呼び出す
// // //         const { userId, total } = await getUserIdAndTotal(userName, sheetId, sheetName);

// // //         await client.chat.postMessage({
// // //           channel: memberId,
// // //           text: `合計(${sheetName}): ${total}, ユーザーID: ${userId}, ユーザー名: ${userName}`,
// // //         });
// // //       }
// // //     } else {
// // //       console.log('無効なメッセージ形式です。');
// // //       await client.chat.postMessage({
// // //         channel: memberId,
// // //         text: 'メッセージの形式が無効です。',
// // //       });
// // //     }
// // //   } catch (error) {
// // //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// // //   }
// // // });

// // slackApp.message('出席', async ({ message, client }) => {
// //   try {
// //     const memberId = message.user;
// //     const userProfile = await client.users.profile.get({
// //       user: memberId,
// //     });

// //     const email = userProfile.profile.email;
// //     const userName = extractUserName(email);
// //     const dateRow = await getDateRow();
// //     const currentTime = new Date();
// //     const hours = currentTime.getHours();
// //     const minutes = currentTime.getMinutes();
// //     const totalMinutes = hours * 60 + minutes;

// //     // タイムレンジの定義
// //     const timeRanges = [
// //       { start: 9 * 60 + 20, end: 11 * 60 },
// //       { start: 11 * 60 + 10, end: 12 * 60 + 40 },
// //       { start: 23 * 60 + 20, end: 23 * 60 + 35 },
// //       { start: 23 * 60 + 28, end: 23 * 60 + 30},
// //     ];

// //     // タイムレンジ内かどうかの判定
// //     const isInTimeRange = timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);

// //     if (message.text.trim().toLowerCase() !== '出席') {
// //       return;
// //     }

// //     if (!isInTimeRange) {
// //       console.log('今は打刻できません。');
// //       await client.chat.postMessage({
// //         channel: memberId,
// //         text: '今は打刻できません。',
// //       });
// //       return;
// //     }

// //     await handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes);
// //   } catch (error) {
// //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// //   }
// // });

// // // タイムレンジ内かどうかの判定用の関数
// // function isInTimeRange(totalMinutes, startMinutes, endMinutes) {
// //   return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
// // }

// // async function initializeSettings() {
// //   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
// //     const sheetInfoList = await getAllSettingsFromDatabase();

// //     if (sheetInfoList.length > 0) {
// //       // プロジェクトによっては必要に応じて適切な方法でシート情報を選択する必要があります。
// //       // 以下は最初のシート情報を選択する例です。
// //       const { sheetId, sheetName } = sheetInfoList[0];
// //       updateSettings(sheetId, sheetName);
// //       console.log('データベースからの設定更新:', getSettings());
// //     } else {
// //       console.log('データベースからシート情報が取得できませんでした。');
// //     }
// //   }
// // }
// // function extractUserName(email) {
// //   const atIndex = email.indexOf('@');
// //   return email.substring(0, atIndex);
// // }


// // async function handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes) {
// //   if (attendanceRecords[memberId]) {
// //     await client.chat.postMessage({
// //       channel: memberId,
// //       text: 'もう出席済みです！',
// //     });
// //   } else {
// //     const dateRow = await getDateRow();

// //     if (dateRow !== null) {
// //       const sheetData = await getSheetData(userName, dateRow);

// //       if (sheetData) {
// //         attendanceRecords[memberId] = true;

// //         let attendanceMessage = `出席を確認しました。\n出席者: ${userName}\n時刻: ${hours}時${minutes}分`;

// //         if ((hours === 9 && minutes >= 41 || hours >= 11) || (hours === 11 && minutes >= 21 || hours >= 12 && minutes <= 40) || (hours === 14 && minutes >= 11 || hours >= 15 && minutes <=20) || (hours === 15 && minutes >= 41 || hours >= 0 && minutes <= 20)) {
// //           attendanceMessage += '\n遅刻です。ご注意ください。';
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 1);
// //         } else {
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 2);
// //         }

// //         // シート名をメッセージに追加
// //         const settings = getSettings();
// //         attendanceMessage += `\nシート名: ${settings.subjectSheetName}`;

// //         console.log('attendanceMessage', attendanceMessage);

// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: attendanceMessage,
// //         });
// //       } else {
// //         console.log('スプレッドシート内でユーザーが見つかりませんでした。');
// //       }
// //     } else {
// //       console.log('スプレッドシート内で日付行が見つかりませんでした。');
// //     }
// //   }
// // }


// // (async () => {
// //   await slackApp.start(3001);
// //   console.log('⚡️ Bolt app is running on port 3001!');
// // })();

// require('dotenv').config();
// const { WebClient } = require('@slack/web-api');
// const { App } = require('@slack/bolt');
// const {
//   getAllSettingsFromDatabase,
//   getSettings,
//   getDateRow,
//   getSheetData,
//   updateSheetData,
//   getTotalFromSheet,
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
//     console.log('Received message:', message);

    
//     const memberId = message.user;
//     console.log('memberId:', memberId);
//     if (!memberId) {
//       console.error('Error: memberId is undefined');
//       return;
//     }
//     // const channelId = message.channel
//     // const settings = getSettings();
//     // console.log('Settings:', settings);
//     const channelId = message.channel;
//     console.log('Channel ID:', channelId);

//     // チャンネルIDが一致する場合のみ処理を続行
//     const settings = getSettings();
//     console.log('Settings:', settings);

//     if (channelId !== settings.channelId) {
//       console.log('Received message in a different channel. Ignoring.');
//       return;
//     }
//     const userProfile = await client.users.profile.get({
//       user: memberId,
//     });
//     console.log('userProfile:', userProfile);
//     const email = userProfile.profile.email;
//     const userName = extractUserName(email);
//     const dateRow = await getDateRow();
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     const minutes = currentTime.getMinutes();
    
//     const totalMinutes = hours * 60 + minutes;
//     // タイムレンジの定義
//     const timeRanges = [
//       { start: 9 * 60 + 30, end: 11 * 60},   // 1コマ目の授業時間
//       { start: 11 * 60 + 10, end: 12 * 60 + 40 },  // 2コマ目の授業時間
//       { start: 13 * 60 + 50, end: 15 * 60 + 20 },    // 3コマ目の授業時間
//       { start: 15 * 60 + 30, end: 17 * 60},    // 4コマ目の授業時間
//     ];
//         // タイムレンジ内かどうかの判定
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
//   if (totalMinutes >= 9 * 60 + 30 && totalMinutes <= 11 * 60) {
//     return '1';
//   } else if (totalMinutes >= 11 * 60 + 10 && totalMinutes <= 12 * 60 + 40) {
//     return '2';
//   } else if (totalMinutes >= 13 * 60 + 50 && totalMinutes <= 15 * 60 + 20) {
//     return '3';
//   } else if (totalMinutes >= 15 * 60 + 30 && totalMinutes <= 17 * 60) {
//     return '4';
//   }
//   async function initializeSheetSettings() {
    
//     // settings オブジェクトの初期化
//     const settings = getSettings();
    
  
//     if (settings.spreadsheetId === null || settings.subjectSheetName === null || settings.channelId === null) {
//       const sheetInfoList = await getAllSettingsFromDatabase();
      
  
//       if (sheetInfoList.length > 0) {
//         const { sheetId, sheetName, channelId } = sheetInfoList[0];
//         updateSettings(sheetId, sheetName, channelId);
//         const updatedSettings = getSettings(); // settings を更新
//         console.log('データベースからのシート情報とチャンネルIDの設定更新:', updatedSettings);
//       } else {
//         console.log('データベースからシート情報が取得できませんでした。');
//       }
//     }
//   }
//   // 対応するコマがない場合は null またはエラー処理を行う
//   return null;
// }
// // タイムレンジ内かどうかの判定用の関数
// function isInTimeRange(totalMinutes, startMinutes, endMinutes) {
//   return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
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
//         if ((hours === 9 && minutes >= 41 || hours >= 10) || (hours === 11 && minutes >= 21 || hours >= 12 && minutes <= 40) || (hours === 14 && minutes >= 11 || hours >= 15 && minutes <=20) || (hours === 15 && minutes >= 41 || hours >= 0 && minutes <= 20)) {
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

// // slackApp.message('合計取得', async ({ message, client }) => {
// //   try {
// //     // メッセージからシート名を取得
// //     const sheetNameToCheck = extractSheetName(message.text);
// //     console.log('Received message:', message);
// //     console.log('Extracted sheet name:', sheetNameToCheck);

// //     // シートから合計を取得
// //     const totalValue = await getTotalFromSheet(sheetNameToCheck);
// //     console.log('Total value:', totalValue);

// //     // 合計をSlackにメッセージで送信
// //     await client.chat.postMessage({
// //       channel: message.user,
// //       text: `シート「${sheetNameToCheck}」の合計は ${totalValue} です。`,
// //     });
// //   } catch (error) {
// //     console.error('Error processing message:', error);
// //   }
// // });

// // // メッセージからシート名を抽出する関数
// // function extractSheetName(messageText) {
// //   const matchResult = messageText.match(/合計取得\s*([^\s]+)/);
// //   if (matchResult && matchResult[1]) {
// //     return matchResult[1];
// //   } else {
// //     console.error('Error extracting sheet name from message:', messageText);
// //     return ''; // シート名が見つからない場合、空の文字列を返す
// //   }
// // }


// // const web = new WebClient(slackToken);

// // // スケジューラの設定
// // const schedule = require('node-schedule');

// // // メンバーに対してメッセージを送信する関数
// // async function sendReminderMessage(userId, text) {
// //   try {
// //     // SlackのAPIを使用してメッセージを送信
// //     await web.chat.postMessage({
// //       channel: userId, // ユーザーIDを指定
// //       text,
// //     });
// //   } catch (error) {
// //     console.error('Error sending reminder message:', error);
// //   }
// // }

// // // メンバーの最終メッセージを確認し、指定された文字列が含まれていなければメッセージを送信
// // async function checkAndSendReminders(channelId, searchString, reminderText) {
// //   try {
// //     // SlackのAPIを使用してチャンネルのメンバーの情報を取得
// //     const result = await slackApp.client.conversations.members({
// //       channel: channelId,
// //     });
// //     const members = result.members;

// //     // 今日の14時10分のタイムスタンプを取得
// //     const todayAt1410 = new Date();
// //     todayAt1410.setHours(15, 32, 0, 0);

// //     // 各メンバーに対して処理を実行
// //     members.forEach(async (memberId) => {
// //       try {
// //         // SlackのAPIを使用してメンバーの最終メッセージの情報を取得
// //         const history = await slackApp.client.conversations.history({
// //           channel: channelId,
// //           user: memberId,
// //         });

// //         // 最終メッセージの日時を取得
// //         const lastMessageTimestamp = new Date(history.messages[0].ts * 1000);

// //         // 最終メッセージが指定された文字列を含まない場合にメッセージを送信
// //         if (lastMessageTimestamp < todayAt1410 && !history.messages[0].text.includes(searchString)) {
// //           await sendReminderMessage(memberId, reminderText);
// //         }
// //       } catch (error) {
// //         console.error('Error processing member:', error);
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error getting members:', error);
// //   }
// // }

// // // 14時10分にスケジュールされたジョブを作成
// // const dailyJob = schedule.scheduleJob({ hour: 15, minute: 32 }, () => {
// //   // 特定のチャンネルIDを指定せずに、メッセージを送信
// //   checkAndSendReminders('C065H11G1HC', '出席', '今日はまだ出席メッセージがありません。');
// // });
// const web = new WebClient(slackToken);

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
// // async function checkAndSendReminders(channelId, searchString, reminderText) {
// //   try {
// //     // SlackのAPIを使用してチャンネルのメンバーの情報を取得
// //     const result = await slackApp.client.conversations.members({
// //       channel: channelId,
// //     });
// //     const members = result.members;

// //     // 4日後の12時のタイムスタンプを取得
// //     const fourDaysLaterAt1200 = new Date();
// //     fourDaysLaterAt1200.setDate(fourDaysLaterAt1200.getDate() + 1);
// //     fourDaysLaterAt1200.setHours(10, 5, 0, 0);

// //     // 各メンバーに対して処理を実行
// //     members.forEach(async (memberId) => {
// //       try {
// //         // SlackのAPIを使用してメンバーの最終メッセージの情報を取得
// //         const history = await slackApp.client.conversations.history({
// //           channel: channelId,
// //           user: memberId,
// //         });

// //         // 最終メッセージの日時を取得
// //         const lastMessageTimestamp = new Date(history.messages[0].ts * 1000);

// //         // 最終メッセージが指定された文字列を含まない場合で、
// //         // 4日間一度もお昼12時までにメッセージを送っていない場合にメッセージを送信
// //         if (
// //           lastMessageTimestamp < fourDaysLaterAt1200 &&
// //           !history.messages[0].text.includes(searchString) &&
// //           ![0, 6].includes(lastMessageTimestamp.getDay()) // 土曜日 (0) または 日曜日 (6) でないことを確認
// //         ) {
// //           await sendReminderMessage(memberId, reminderText);
// //         }
// //       } catch (error) {
// //         console.error('Error processing member:', error);
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error getting members:', error);
// //   }
// // }

// // // お昼12時にスケジュールされたジョブを作成
// // const dailyJob = schedule.scheduleJob({ hour: 10, minute: 5 }, () => {
// //   // 特定のチャンネルIDを指定せずに、メッセージを送信
// //   checkAndSendReminders('C065H11G1HC', '出席', '4日間一度も出席がありません。');
// // });
// async function checkAndSendRemindersForAllChannels(searchString, reminderText) {
//   try {
//     // ワークスペース内のすべてのチャンネルのリストを取得
//     const result = await slackApp.client.conversations.list();
//     const channels = result.channels;

//     // 各チャンネルに対して処理を実行
//     for (const channel of channels) {
//       try {
//         // ダイレクトメッセージでない場合のみ処理
//         if (channel.is_channel) {
//           const channelId = channel.id;

//           // このチャンネル内のメンバーに対してリマインダーを確認して送信する既存の関数を呼び出す
//           await checkAndSendReminders(channelId, searchString, reminderText);
//         }
//       } catch (error) {
//         console.error('チャンネル処理中にエラーが発生しました:', error);
//       }
//     }
//   } catch (error) {
//     console.error('チャンネルの取得中にエラーが発生しました:', error);
//   }
// }

// // すべてのチャンネルに対してジョブをスケジュール
// const dailyJob = schedule.scheduleJob({ hour: 10, minute: 5 }, () => {
//   // すべてのチャンネルに対してリマインダーを確認して送信する関数を呼び出す
//   checkAndSendRemindersForAllChannels('出席', '4日間一度も出席がありません。');
// });



// (async () => {
//   await slackApp.start(3001);
//   console.log('⚡️ Bolt app is running on port 3001!');
// })();





// // require('dotenv').config();
// // const { App } = require('@slack/bolt');
// // const {
// //   getAllSettingsFromDatabase,
// //   getSettings,
// //   getDateRow,
// //   getSheetData,
// //   updateSheetData,
// //   updateSettingsFromDatabase,
// // } = require('./sheet');

// // const slackToken = process.env.SLACK_BOT_TOKEN;
// // const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// // const slackApp = new App({
// //   token: slackToken,
// //   signingSecret: slackSigningSecret,
// // });

// // // ユーザーごとに出席ステータスを管理するオブジェクト
// // // 授業ごとの出席フラグを管理するオブジェクト
// // const attendanceRecordsByClass = {
// //   '1': {}, // 1コマ目
// //   '2': {}, // 2コマ目
// //   '3': {}, // 3コマ目
// //   '4': {}, // 4コマ目
// // };

// // // ユーザーごとに最後に出席メッセージを受信した日付を管理するオブジェクト
// // const lastAttendanceMessageDate = {};

// // slackApp.message('出席', async ({ message, client }) => {
// //   try {
// //     const memberId = message.user;
// //     const userProfile = await client.users.profile.get({
// //       user: memberId,
// //     });

// //     const email = userProfile.profile.email;
// //     const userName = extractUserName(email);
// //     const dateRow = await getDateRow();
// //     const currentTime = new Date();
// //     const hours = currentTime.getHours();
// //     const minutes = currentTime.getMinutes();
// //     const totalMinutes = hours * 60 + minutes;

// //     // タイムレンジの定義
// //     const timeRanges = [
// //       { start: 9 * 60 + 20, end: 11 * 60 },   // 1コマ目の授業時間
// //       { start: 11 * 60 + 10, end: 12 * 60 + 40 },  // 2コマ目の授業時間
// //       { start: 13 * 60 + 50, end: 13 * 60 + 55 },    // 3コマ目の授業時間
// //       { start: 13 * 60 + 56, end: 14 * 60},    // 4コマ目の授業時間
// //     ];

// //     // タイムレンジ内かどうかの判定
// //     const isInTimeRange = timeRanges.some(range => totalMinutes >= range.start && totalMinutes <= range.end);

// //     if (message.text.trim().toLowerCase() !== '出席') {
// //       return;
// //     }

// //     // 出席フラグを管理するオブジェクトを選択
// //     const classIndex = getClassIndex(totalMinutes);
// //     const classAttendanceRecords = attendanceRecordsByClass[classIndex];

// //     if (!isInTimeRange || classAttendanceRecords[memberId]) {
// //       // 時間外または既に出席済みの場合
// //       let messageText = '今は打刻できません。';
// //       if (classAttendanceRecords[memberId]) {
// //         messageText = 'もう出席済みです！';
// //       }

// //       console.log(messageText);
// //       await client.chat.postMessage({
// //         channel: memberId,
// //         text: messageText,
// //       });
// //       return;
// //     }

// //     // 出席処理
// //     await handleAttendance(client, memberId, classAttendanceRecords, userName, currentTime, hours, minutes);

// //     // ユーザーごとに最後に出席メッセージを受信した日付を更新
// //     lastAttendanceMessageDate[memberId] = new Date().toDateString();
// //   } catch (error) {
// //     console.error('Slack イベントの処理中にエラーが発生しました:', error);
// //   }
// // });

// // // 未出席のユーザーに対して警告を行う処理
// // function warnUsersWithNoAttendance(client) {
// //   const today = new Date().toDateString();

// //   for (const memberId in lastAttendanceMessageDate) {
// //     const lastAttendanceDate = lastAttendanceMessageDate[memberId];
// //     const daysSinceLastAttendance = calculateDaysDifference(today, lastAttendanceDate);

// //     console.log(`Member ID: ${memberId}, Last Attendance Date: ${lastAttendanceDate}, Days Since Last Attendance: ${daysSinceLastAttendance}`);

// //     if (daysSinceLastAttendance >= 3) {
// //       // 警告メッセージを送信
// //       const warningMessage = `:warning: <@${memberId}> さん、最後の出席メッセージから ${daysSinceLastAttendance} 日が経過しています。出席のお願いがありましたら、メッセージを送信してください。`;
// //       client.chat.postMessage({
// //         channel: 'C06330FG7PH', // Replace 'your_channel_id_here' with the actual channel ID
// //         text: warningMessage,
// //       });
// //     }
// //   }
// // }

// // // 2つの日付の差分を計算するヘルパー関数
// // function calculateDaysDifference(date1, date2) {
// //   const oneDay = 24 * 60 * 60 * 1000; // 1日のミリ秒数
// //   const firstDate = new Date(date1);
// //   const secondDate = new Date(date2);
// //   const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
// //   return diffDays;
// // }

// // // 定期的に未出席のユーザーに対して警告を行う
// // setInterval(() => {
// //   warnUsersWithNoAttendance(slackApp.client);
// // }, 24 * 60 * 60 * 1000); // 24時間ごとに実行

// // // 与えられた時刻に対応するコマのインデックスを取得
// // function getClassIndex(totalMinutes) {
// //   if (totalMinutes >= 9 * 60 + 20 && totalMinutes <= 11 * 60) {
// //     return '1';
// //   } else if (totalMinutes >= 11 * 60 + 10 && totalMinutes <= 12 * 60 + 40) {
// //     return '2';
// //   } else if (totalMinutes >= 13 * 60 + 50 && totalMinutes <= 13 * 60 + 55) {
// //     return '3';
// //   } else if (totalMinutes >= 13 * 60 + 56 && totalMinutes <= 14 * 60) {
// //     return '4';
// //   }
// //   // 対応するコマがない場合は null またはエラー処理を行う
// //   return null;
// // }

// // // タイムレンジ内かどうかの判定用の関数
// // function isInTimeRange(totalMinutes, startMinutes, endMinutes) {
// //   return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
// // }

// // async function initializeSettings() {
// //   // settings オブジェクトの初期化
// //   let settings = getSettings();

// //   if (settings.spreadsheetId === null || settings.subjectSheetName === null) {
// //     const sheetInfoList = await getAllSettingsFromDatabase();

// //     if (sheetInfoList.length > 0) {
// //       const { sheetId, sheetName } = sheetInfoList[0];
// //       updateSettings(sheetId, sheetName);
// //       settings = getSettings(); // settings を更新
// //       console.log('データベースからの設定更新:', settings);
// //     } else {
// //       console.log('データベースからシート情報が取得できませんでした。');
// //     }
// //   }
// // }

// // function extractUserName(email) {
// //   const atIndex = email.indexOf('@');
// //   return email.substring(0, atIndex);
// // }

// // async function handleAttendance(client, memberId, attendanceRecords, userName, currentTime, hours, minutes) {
// //   if (attendanceRecords[memberId]) {
// //     await client.chat.postMessage({
// //       channel: memberId,
// //       text: 'もう出席済みです！',
// //     });
// //   } else {
// //     const dateRow = await getDateRow();

// //     if (dateRow !== null) {
// //       const sheetData = await getSheetData(userName, dateRow);

// //       if (sheetData) {
// //         attendanceRecords[memberId] = true;

// //         let attendanceMessage = `出席を確認しました。\n出席者: ${userName}\n時刻: ${hours}時${minutes}分`;

// //         if ((hours === 9 && minutes >= 41 || hours >= 11) || (hours === 11 && minutes >= 21 || hours >= 12 && minutes <= 40) || (hours === 13 && minutes >= 30 || hours >= 13 && minutes <=40) || (hours === 15 && minutes >= 41 || hours >= 0 && minutes <= 20)) {
// //           attendanceMessage += '\n遅刻です。ご注意ください。';
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 1);
// //         } else {
// //           await updateSheetData(sheetData.row, sheetData.column, sheetData.value + 2);
// //         }

// //         // シート名をメッセージに追加
// //         const settings = getSettings();
// //         attendanceMessage += `\nシート名: ${settings.subjectSheetName}`;

// //         console.log('attendanceMessage', attendanceMessage);

// //         await client.chat.postMessage({
// //           channel: memberId,
// //           text: attendanceMessage,
// //         });
// //       } else {
// //         console.log('スプレッドシート内でユーザーが見つかりませんでした。');
// //       }
// //     } else {
// //       console.log('スプレッドシート内で日付行が見つかりませんでした。');
// //     }
// //   }
// // }

// // (async () => {
// //   await slackApp.start(3001);
// //   console.log('⚡️ Bolt app is running on port 3001!');
// // })();

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