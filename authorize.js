// // // // authorize.js

const { google } = require('googleapis');

const keyPath = 'C:\\Users\\n22030masa\\MASATO\\NODE\\project\\key\\my-project-dakoku-406113-2d5b4c8768aa.json';

async function authorize() {
  const keyFile = require(keyPath);
  const { client_email, private_key } = keyFile;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email, private_key },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  return auth.getClient();
}

module.exports = authorize;


