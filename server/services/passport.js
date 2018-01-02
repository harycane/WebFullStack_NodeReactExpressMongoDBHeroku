//require passport to use its strategies
const passport = require('passport');
//require passport-google-oauth20.Strategy to use GoogleStrategy instance
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//require keys to access clientID and clientSecret that we secured
const keys = require('../config/keys');
//require mongoose to persist profile id
const mongoose = require('mongoose');

//fetch the model out of mongoose by giving just one argument
const User = mongoose.model('users');
//clientID to validate us as a valid 3rd party client trying to gain permission, public
//clientSecret is a private value, given again to authenicate as a valid 3rd party client trying to gain access from google of the user info.

//accessToken is the permission evidence granted by the user for the application to read their account's scope info.
//refreshToken to renew our accessToken after it gets expired
//profile is google+ profile (which is the service that has to be choosen for enabling api access in google dev console)

//gets called after the callback function is executed, by passport
//method to generate identifying token to set cookie
//user instance same as the one retrieved and passed to done method in the callback function
//turning mongoose model into a token id to set cookie
//need to call done in the body
passport.serializeUser((user, done) => {
  done(null, user.id); //not the profile id; it is the shortcut to mongoDB's id
  //reason we are using mongodb id is that if we have fb linkedin oauth then we cant
  //asume that user will be signing in with google for sure, but it is safe to assume that mongodb will generate a id associated with the record
});

//cookie-session decrypts the cookie from req and passport looks at req session to get id and calls deserialize
//deserialize method to find the user from the token of the cookie
//turning the token id from cookie back to a mongoose model
//need to call done in the body
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user); ////user model instance added to req obj as req.user
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true //to prevent https from rerouting to http due to proxy
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      //using promise coz interaction with MongoDB is async
      if (existingUser) {
        //existingUser is the model instance returned by findOne method
        //we already have a record with the given profile ID
        return done(null, existingUser); //null means no error, and pass the existingUser profile
      }
      //we dont have a user record with this ID, make a new record and call serialize
      const user = await new User({ googleId: profile.id }).save(); //to persist the data onto db
      done(null, user); //since saving is async use promise
      //although new User and user point to same user instance, we use the user instance
      //which is returned back from the db as it would be the latest instance in case of concurrent access.
    }
  )
);
