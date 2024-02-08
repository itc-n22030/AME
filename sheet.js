// console.log('Initializing settings...');

// const { google } = require('googleapis');
// const authorize = require('./authorize');
// const mysql = require('mysql2/promise'); // mysql2ライブラリをインポート

// let settings = {
//   spreadsheetId: null,
//   subjectSheetName: null,
//   channelId: null, // 追加: Slack チャンネル ID
// };

// async function updateSettingsFromDatabase() {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });
    
//     const [rows] = await connection.execute('SELECT channelId, sheetId, sheetName FROM sheets LIMIT 1');

//     if (rows.length > 0) {
//       const { channelId, sheetId, sheetName } = rows[0];
//       settings = {
//         spreadsheetId: sheetId,
//         subjectSheetName: sheetName,
//         channelId, // 追加: Slack チャンネル ID を設定
//       };
      
//       console.log('Settings updated:', settings);
      
//       console.log('データベースからの設定更新:', settings);
//     } else {
//       console.log('指定されたIDに対応する行が見つかりませんでした。');
//     }

//     await connection.end();
//   } catch (error) {
//     console.error('データベースからの設定更新中にエラーが発生しました:', error);
//   }
// }

// // async function updateSettingsFromDatabase() {
// //   try {
// //     const connection = await mysql.createConnection({
// //       host: process.env.DB_HOST,
// //       user: process.env.DB_USER,
// //       password: process.env.DB_PASSWORD,
// //       database: process.env.DB_DATABASE,
// //     });

// //     const [rows] = await connection.execute('SELECT channelId, sheetId, sheetName FROM sheets');

// //     if (rows.length > 0) {
// //       console.log('Rows from database:', rows);
// //       // 一行目と二行目のデータを取得
// //       const firstRowData = rows[0];
// //       const secondRowData = rows[1];

// //       // それぞれのデータを使って設定を更新
// //       updateSettings(firstRowData.sheetId, firstRowData.sheetName, firstRowData.channelId);
// //       console.log('データベースからの設定更新(一行目):', getSettings());

// //       updateSettings(secondRowData.sheetId, secondRowData.sheetName, secondRowData.channelId);
// //       console.log('データベースからの設定更新(二行目):', getSettings());
// //     } else {
// //       console.log('データベースから取得した行がありませんでした。');
// //     }

// //     await connection.end();
// //   } catch (error) {
// //     console.error('データベースからの設定更新中にエラーが発生しました:', error);
// //   }
// // }



// // async function getUserNameTotal(username) {
// //   const settings = getSettings();
// //   const { sheetId, sheetName } = settings;

// //   try {
// //     const auth = await authorize();
// //     const sheetsClient = google.sheets({ version: 'v4', auth });

// //     const response = await sheetsClient.spreadsheets.values.get({
// //       spreadsheetId: sheetId,
// //       range: `${sheetName}!A2:Z32`, // Assuming the user data is in columns A to I starting from row 2
// //     });

// //     const values = response.data.values;

// //     for (let i = 0; i < values.length; i++) {
// //       if (values[i][0] === username) {
// //         return {
// //           row: i + 2, // row number
// //           value: parseInt(values[i][24]) || 0, // assuming Y列 is the 25th column (0-indexed)
// //         };
// //       }
// //     }

// //     return null;
// //   } catch (error) {
// //     console.error('Error getting user total:', error);
// //     return null;
// //   }
// // }
// // async function getTotalFromSheet(sheetName) {
// //   const auth = await authorize();
// //   const sheetsClient = google.sheets({ version: 'v4', auth });

// //   const response = await sheetsClient.spreadsheets.values.get({
// //     spreadsheetId: settings.spreadsheetId,
// //     range: `${sheetName}!Y1:Y`, // Assuming the total is in column Y
// //   });

// //   const values = response.data.values;

// //   if (values && values.length > 0) {
// //     // Y列の値を数値に変換して合計を計算
// //     const totalValue = values.reduce((acc, row) => acc + (parseInt(row[0]) || 0), 0);
// //     return totalValue;
// //   } else {
// //     console.log(`Sheet ${sheetName} does not have any data in column Y.`);
// //     return null;
// //   }
// // }
// function updateSettings(spreadsheetId, subjectSheetName, channelId) {
//   settings = {
//     spreadsheetId,
//     subjectSheetName,
//     channelId, // 新しく追加
//   };
//   console.log('Settings updated:', settings);
// }

// function getSettings() {
//   return settings;
// }


// // 新しく追加した部分: データベースからの更新がある場合に呼び出す
// async function initializeSettings() {
//   if (settings.spreadsheetId === null || settings.subjectSheetName === null || settings.channelId === null) {
//     await updateSettingsFromDatabase();
//   }
// }

// // アプリケーション開始時に一度だけ呼び出す
// initializeSettings();

// // function updateSettings(spreadsheetId, subjectSheetName) {
// //   settings = {
// //     spreadsheetId,
// //     subjectSheetName,

// //   };
// //   console.log('Settings updated:', settings);
// // }

// // function getSettings() {
// //   return settings;
// // }

// async function getDateRow() {
//   const auth = await authorize();
//   const sheetsClient = google.sheets({ version: 'v4', auth });

//   const response = await sheetsClient.spreadsheets.values.get({
//     spreadsheetId: settings.spreadsheetId,
//     range: `${settings.subjectSheetName}!A1:Z1`, // Assuming the date is in the first row from column A to I
//   });

//   const values = response.data.values;

//   if (values && values.length > 0) {
//     const currentDate = getCurrentDate();
//     // Search for the current date in the first row
//     for (let i = 0; i < values[0].length; i++) {
//       if (values[0][i] === currentDate) {
//         return i + 1; // Return the column number corresponding to the current date
//       }
//     }
//   }

//   return null;
// }

// // Get the current date in the format MM/DD
// function getCurrentDate() {
//   const currentDate = new Date();
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//   const day = currentDate.getDate().toString().padStart(2, '0');
//   return `${month}/${day}`;
// }

// async function getSheetData(username, dateRow) {
//   const auth = await authorize();
//   const sheetsClient = google.sheets({ version: 'v4', auth });

//   const response = await sheetsClient.spreadsheets.values.get({
//     spreadsheetId: settings.spreadsheetId,
//     range: `${settings.subjectSheetName}!A2:Z32`, // Assuming the user data is in columns A to I starting from row 2
//   });

//   const values = response.data.values;

//   for (let i = 0; i < values.length; i++) {
//     if (values[i][0] === username) {
//       return {
//         row: i + 2, // row number
//         column: dateRow, // column number for the current date
//         value: parseInt(values[i][dateRow - 1]) || 0, // value in the corresponding column
//       };
//     }
//   }

//   return null;
// }
// // async function getUserIdAndTotal(username, sheetId, sheetName) {
// //   try {
// //     const auth = await authorize();
// //     const sheetsClient = google.sheets({ version: 'v4', auth });

// //     const response = await sheetsClient.spreadsheets.values.get({
// //       spreadsheetId: sheetId,
// //       range: `${sheetName}!A2:Z32`, // Assuming the user data is in columns A to I starting from row 2
// //     });

// //     const values = response.data.values;

// //     for (let i = 0; i < values.length; i++) {
// //       if (values[i][0] === username) {
// //         return {
// //           userId: values[i][1], // Assuming the user ID is in the second column (0-indexed)
// //           total: parseInt(values[i][24]) || 0, // Assuming Y列 is the 25th column (0-indexed)
// //         };
// //       }
// //     }

// //     return null;
// //   } catch (error) {
// //     console.error('Error getting user ID and total:', error);
// //     return null;
// //   }
// // }

// async function updateSheetData(row, column, value) {
//   const auth = await authorize();
//   const sheetsClient = google.sheets({ version: 'v4', auth });

//   const values = [[value]];

//   await sheetsClient.spreadsheets.values.update({
//     spreadsheetId: settings.spreadsheetId,
//     range: `${settings.subjectSheetName}!${String.fromCharCode(65 + column - 1)}${row}`, // Convert column number to letter (A=65, B=66, ...)
//     valueInputOption: 'RAW',
//     resource: { values },
//   });
// }
// function getChannelId() {
//   return settings.channelId;
// }
// module.exports = { getDateRow, getSheetData, updateSheetData, updateSettings, getSettings, getChannelId };
// sheet.js

require('dotenv').config(); // .envファイルの読み込み
const authorize = require('./authorize');
const mysql = require('mysql2/promise');

// データベース関連の設定
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

// データベースへの接続関数
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// データベースからシート情報を取得する関数
async function getSheetInfo(channelId) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM sheets WHERE channelId = ?', [channelId]);
    connection.end();
    return rows[0];
  } catch (error) {
    console.error('Error getting sheet info from the database:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  getSheetInfo,
  dbConfig // 新しく追加
};