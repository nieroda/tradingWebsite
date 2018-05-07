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

userModel.pre('save', async function(next) {
  try {
    if (!this.isModified("password")) {
      return next()
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    return next()
  } catch (e) {
    return next(e)
  }
})

userModel.methods.comparePassword = async function (potentialPassword, next){
  try {
    let isMatch = await bcrypt.compare(potentialPassword, this.password)
    return isMatch
  } catch (e) {
    return next(e)
  }
}

module.exports = mongoose.model('userModel', userModel);
