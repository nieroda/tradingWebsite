const mongoose = require('mongoose')

mongoose.connect(`urlhere`, {useMongoClient: true}, () => {
  console.log('connected successfully');
});;

mongoose.Promise = Promise;


module.exports.dummyModel  = require('./dummyModel');
