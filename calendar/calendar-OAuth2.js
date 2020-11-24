const { google } = require('googleapis');;
require('dotenv').config()
const SCOPES = 'https://www.googleapis.com/auth/calendar'

const TOKEN_PATH = process.env.TOKEN_GCALENDAR;
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS_GCALENDAR);
const calendarId = process.env.CALENDAR_ID;
const API_KEY = process.env.API_KEY;

const CLIENT_ID = process.env.CAL_CLIENT_ID;
const CLIENT_SECRET = process.env.CAL_CLIENT_SECRET;
const REDIRECT_URL = "#"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
)

const url = oauth2Client.generateAuthURL({
  access_type: 'offline',
  scope: SCOPES
});

google.options({auth: oauth2Client})

async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:5000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const { tokens } = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
      });
    destroyer(server);
  });
}
