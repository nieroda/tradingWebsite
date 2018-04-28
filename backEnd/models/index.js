const mongoose = require('mongoose')

mongoose.connect(`mongodb://nkamm:boson@ds014658.mlab.com:14658/testlab`, () => {
  console.log('connected successfully');
});;


mongoose.Promise = Promise;

//module.exports = mongoose;
module.exports.dummyModel  = require('./dummyModel')
module.exports.commentModel = require('./commentModel')
module.exports.tradeModel = require('./tradeModel')
module.exports.userModel = require('./userModel')
