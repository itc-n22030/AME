const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const authorize = require('../authorize');  // 修正した相対パス
const session = require('express-session');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

let sheetDataList = []; // sheetDataListをグローバルスコープに移動


app.post('/login', async (req, res) => {
  const { username, password, sheetName } = req.body;

  // 各ログイン試行ごとにsheetDataListをクリアする
  sheetDataList = [];

  // ユーザー名が 'n','s','c' から始まる場合にのみ Google Sheets API を使用してシート情報を取得
  if (username.startsWith('n', 's', 'c')) {
    // ログイン成功時の処理
    // Google Sheets API で指定のフォルダ内のシート一覧を取得
    authorize().then(async (auth) => {
      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = '1yWF-VgSZhwn2fAN5riMataMHxTUNhl7LO0-euUSJ9So';

      const sheetList = await sheets.spreadsheets.get({ spreadsheetId });

      for (const sheet of sheetList.data.sheets) {
        console.log('Sheet Name:', sheet.properties.title);
        const sheetData = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: `${sheet.properties.title}!A:Z`,
        });

        const values = sheetData.data.values;

        const userRow = values.find(row => row[0] === username);

        if (userRow) {
          userRow.shift();
          const additionalData = values.slice(0, 2).map(row => row.slice(1, 26));
          const mergedData = [...additionalData, userRow];

          sheetDataList.push({
            sheetName: sheet.properties.title,
            values: mergedData,
          });
        }
      }

      res.redirect(`/select-sheet?username=${username}`);
    }).catch(error => {
      console.error('Error authorizing:', error);
      res.status(500).send('Error authorizing');
    });
  } else {
    res.status(401).send('Authentication failed');
  }
});

app.get('/select-sheet', (req, res) => {
  const username = req.query.username || 'Guest';
  const sheetOptions = sheetDataList.map(sheetData => `<option value="${sheetData.sheetName}">${sheetData.sheetName}</option>`).join('');

  res.send(`
    <html>
      <head>
        <title>Select Sheet</title>
      </head>
      <body>
              <p>ようこそ, ${username}さん!</p>
        <form action="/view-sheet?username=${username}" method="post"> <!-- クエリパラメータを追加 -->
          <label for="sheetName">シートを選択:</label>
          <select id="sheetName" name="sheetName">
            ${sheetOptions}
          </select>
          <br>
          <button type="submit">確認</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/view-sheet', (req, res) => {
  const { sheetName } = req.body;
  const username = req.query.username || 'Guest'; // usernameをクエリパラメータから取得

  const selectedSheetData = sheetDataList.find(sheetData => sheetData.sheetName === sheetName);

  if (!selectedSheetData) {
    res.status(404).send('Sheet not found');
    return;
  }

  res.send(`
    <html>
      <head>
        <title>出席状況</title>
      </head>
      <body>
        <h1>現在の出席状況</h1>
        <h2>${selectedSheetData.sheetName}</h2>
        <table border="1">
          ${selectedSheetData.values.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </table>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/login.html`);
});
