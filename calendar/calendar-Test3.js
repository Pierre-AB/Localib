const { google } = require('googleapis');

const credentials = JSON.parse(process.env.CREDENTIALS_CALENDAR);
const { client_id, client_secret, redirect_uris } = credentials.installed;



const scopes = ['https://www.googleapis.com/auth/calendar'];

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris
);

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})


