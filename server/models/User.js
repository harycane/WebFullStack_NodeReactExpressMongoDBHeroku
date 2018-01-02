//User.js to create a collection in our data model
const mongoose = require('mongoose');
//mongoose requies a predefined Schema overriding the
//flexibility that MongoDB provides with a not fixed schema
const { Schema } = mongoose;

//defining our collection's schema
const userSchema = new Schema({
  googleId: String
});

//using model class to create a collection, takes in
//the colleciton name and schema as its arguments.
//mongoose will not overwrite existing collections
//it will only create one if it does not exist.
mongoose.model('users', userSchema);
