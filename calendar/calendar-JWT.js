// GOOGLE CALENDAR

const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS_GCALENDAR);
const calendarId = process.env.CALENDAR_ID;
const API_KEY = process.env.API_KEY;

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const TOKEN_PATH = JSON.parse(process.env.TOKEN_GCALENDAR);

const calendar = google.calendar({version: 'v3'})

// Authenticate to the google calendar API

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);





