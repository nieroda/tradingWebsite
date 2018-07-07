const mongoose = require('mongoose')


let userModel = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  displayName: {
    type: String,
    required: true
  },
  profileurl: {
    type: String,
    required: true
  },
  avatarmedium: {
    type: String,
    required: true
  },
  steam64ID: {
    type: String,
    required: true
  },
  tradesOpen: {
    type: Number,
    default: 0
  },
  profileVisits: {
    type: Number,
    default: 0
  },
  trades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tradeModel"
    }
  ]
})


module.exports = mongoose.model('userModel', userModel);
