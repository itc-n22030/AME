
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
