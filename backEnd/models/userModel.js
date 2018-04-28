const mongoose = require('mongoose')


let userModel = new mongoose.Schema({
  name: String,
  time: {
    type: Date,
    default: Date.now
  },
  steamID: String,
  tradesOpen: Number,
  profileVisits: Number,
  trades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tradeModel"
    }
  ]
})


module.exports = mongoose.model('userModel', userModel);
