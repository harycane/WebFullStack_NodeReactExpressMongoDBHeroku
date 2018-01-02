//prod.js - production keys here
//to secure our api keys and db username password
//should be configured in gitignore to avoid public access
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID, //lookup env variable from heroku
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
