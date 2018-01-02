//require passport module to use authenticate method in route handlers
const passport = require('passport');

//grouping the route handlers by purpose into one authRoutes file
//wrapping the route handlers with export to gain access to app instance
//in index.js

module.exports = app => {
  //initial routehandler when user initially clicks Google OAuth login
  //route url/path followed by calling authenticate of passport
  //using google string which is internally mapped in passport for GoogleStrategy
  //scope allows us to define what info of users we need permission for
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //callback routehandler to allow Google server to route back our
  //predefined redirect uri with code needed to validate the user
  //pp authenticate is a middleware to pass the user control flow
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //res has redirect to redirect u to routehandler
      res.redirect('/surveys');
    }
  );

  //route to log out the user
  app.get('/api/logout', (req, res) => {
    req.logout(); //logout fn auto attached to req obj by passport
    //res.send(req.user); //user model instance added to req obj as req.user
    res.redirect('/');
  });
  //route to test the OAuth
  app.get('/api/current_user', (req, res) => {
    //res.send(req.session); //cookie extracts data out of the cookie and assigns it to the req.session
    res.send(req.user); //user model instance added to req obj as req.user
    //one of the prop of session is passport which has the user id we have been schlepping around
    //passport looks at req.session to pull get the data and passes it to deserialize
  });
};
