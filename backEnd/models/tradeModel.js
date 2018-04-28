const mongoose = require('mongoose')


let tradeModel = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  description: String,
  toHave: [],
  toWant: [],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

module.exports = mongoose.model('tradeModel', tradeModel);
