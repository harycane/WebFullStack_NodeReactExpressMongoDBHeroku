//keys.js figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  //we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  //return the dev set of keys
  module.exports = require('./dev'); //pull the keys from dev.js and export it to who ever is calling/asking
}
