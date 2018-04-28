const mongoose = require('mongoose')


let commentModel = new mongoose.Schema({
  name: String,
  steam64ID: String,
  comment: String,
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('commentModel', commentModel);
