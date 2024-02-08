// // server.js
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');
//   // 新しく追加

// const app = express();
// const port = 3002;

// // 一時的なデータベースとして使用
// const sheets = [];

// app.use(express.static(path.join(__dirname, '../public')));
// app.use(bodyParser.urlencoded({ extended: true }));

// // 新しいルート：シートを表示するためのページ
// app.get('/sheets', async (req, res) => {
//   try {
//     // データベースから全てのシート情報を取得
//     const allSheets = await getAllSheets();
//     res.json(allSheets);
//   } catch (error) {
//     console.error('Error retrieving sheets:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // 新しい関数: データベースから全てのシート情報を取得
// function getAllSheets() {
//   return new Promise((resolve, reject) => {
//     const dbConnection = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
// });
//     dbConnection.connect();

//     // シート情報を取得するクエリ
//     const query = 'SELECT * FROM sheets';

//     dbConnection.query(query, (error, results) => {
//       dbConnection.end();

//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }

// // 新しいルート：シートを削除するためのページ
// app.get('/delete', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'delete.html'));
// });
// app.get('/create', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'create.html'));
// });
// app.post('/create', (req, res) => {
//   // ここにシートをデータベースに追加するロジックを実装（以下は例としてのコード）
//   const { channelId, sheetId, sheetName } = req.body;

//   // シート情報をデータベースに追加
//   addSheetToDatabase(channelId, sheetId, sheetName)
//     .then(() => {
//       // 作成後にホームにリダイレクト
//       res.redirect('/home');
//     })
//     .catch(error => {
//       console.error('Error creating sheet:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });

// // 新しい関数: シートをデータベースに追加
// function addSheetToDatabase(channelId, sheetId, sheetName) {
//   return new Promise((resolve, reject) => {
//     const dbConnection = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });

//     dbConnection.connect();

//     // シート情報をデータベースに追加するクエリ
//     const query = `INSERT INTO sheets (channelId, sheetId, sheetName) VALUES ('${channelId}', '${sheetId}', '${sheetName}')`;

//     dbConnection.query(query, (error) => {
//       dbConnection.end();

//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }


// // 新しい関数: シートをデータベースに追加
// function addSheetToDatabase(channelId, sheetId, sheetName) {
//   return new Promise((resolve, reject) => {
//     const dbConnection = mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });

//     dbConnection.connect();

//     // シート情報をデータベースに追加するクエリ
//     const query = `INSERT INTO sheets (channelId, sheetId, sheetName) VALUES ('${channelId}', '${sheetId}', '${sheetName}')`;

//     dbConnection.query(query, (error) => {
//       dbConnection.end();

//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// app.get('/home', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3002;

// 一時的なデータベースとして使用
const sheets = [];

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

// 新しいルート：シートを表示するためのページ
app.get('/sheets', async (req, res) => {
  try {
    // データベースから全てのシート情報を取得
    const allSheets = await getAllSheets();
    res.json(allSheets);
  } catch (error) {
    console.error('Error retrieving sheets:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 新しい関数: データベースから全てのシート情報を取得
async function getAllSheets() {
  try {
    const dbConnection = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Yonaha/2525',
      database: 'sheetname',
    });

    // シート情報を取得するクエリ
    const query = 'SELECT * FROM sheets';

    const [results] = await dbConnection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
}

// 新しいルート：シートを削除するためのページ
app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'delete.html'));
});

app.post('/delete', async (req, res) => {
  // ここにシートをデータベースから削除するロジックを実装（以下は例としてのコード）
  const { channelId, sheetId, sheetName } = req.body;

  // シート情報をデータベースから削除
  deleteSheetFromDatabase(channelId, sheetId, sheetName)
      .then(() => {
          // 削除後にメッセージを設定して削除画面にリダイレクト
          res.redirect('/delete?deleteMessage=削除が完了しました');
      })
      .catch(error => {
          console.error('Error deleting sheet:', error);
          res.status(500).send('Internal Server Error');
      });
});

// 新しい関数: シートをデータベースから削除
async function deleteSheetFromDatabase(channelId, sheetId, sheetName) {
  try {
      const dbConnection = await mysql.createPool({
          host: 'localhost',
          user: 'root',
          password: 'Yonaha/2525',
          database: 'sheetname',
      });

      // シート情報をデータベースから削除するクエリ
      const query = `DELETE FROM sheets WHERE channelId = ? AND sheetId = ? AND sheetName = ?`;
      const values = [channelId, sheetId, sheetName];

      await dbConnection.query(query, values);
  } catch (error) {
      throw error;
  }
};



app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'create.html'));
});
app.post('/create', async (req, res) => {
  // ここにシートをデータベースに作成するロジックを実装（以下は例としてのコード）
  const { channelId, sheetId, sheetName } = req.body;

  // シート情報をデータベースに作成
  createSheetFromDatabase(channelId, sheetId, sheetName)
      .then(() => {
          // 作成後にメッセージを設定して作成画面にリダイレクト
          res.redirect('/create?createMessage=作成が完了しました');
      })
      .catch(error => {
          console.error('Error createing sheet:', error);
          res.status(500).send('Internal Server Error');
      });
});
// 新しい関数: シートをデータベースに追加
async function createSheetFromDatabase(channelId, sheetId, sheetName) {
  try {
    const dbConnection = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Yonaha/2525',
      database: 'sheetname',
    });

    // シート情報をデータベースに追加するクエリ
    const query = `INSERT INTO sheets (channelId, sheetId, sheetName) VALUES (?, ?, ?)`;
    const values = [channelId, sheetId, sheetName];

    await dbConnection.query(query, values);
  } catch (error) {
    throw error;
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'home.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


