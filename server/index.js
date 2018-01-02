//require express to start the express server instance
const express = require('express');
//require mongoose to connect to MongoDB
const mongoose = require('mongoose');
//require cookie session
const cookieSession = require('cookie-session');
//require passport; coz we have to tell passport to keep track of user cookies
const passport = require('passport');
//require keys coz db connection string is defined there
const keys = require('./config/keys');
//require User to cause model class to create a mongoDB collection called User.
require('./models/User'); //order changed to ensure that model gets created first before being called in the passport.
//require passport to execute OAuth
require('./services/passport');

//connect to remote MongoDB using mongoose library
mongoose.connect(keys.mongoURI);

//create an express instance called app to create our node server
const app = express();

//to tell passport to keep track of user authentication state
//config obj takes maxAge in millisec
//key to encrypt our cookie, so that ppl cant manually change the cookie and fake someone else's profile
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //array allows to specify multiple keys, cookieSession picks a random key
  })
);

//to tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//require authRoutes will return a function to which we pass our app server instance.
require('./routes/authRoutes')(app);

//dynamic port binding for heroku deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT);
