// // // // authorize.js

const { google } = require('googleapis');

const keyPath = GOOGLE_SHEETS_API_KEY_PATH;

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


