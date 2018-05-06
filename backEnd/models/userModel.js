const mongoose = require('mongoose')


let userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  steam: Object,
  tradesOpen: Number,
  profileVisits: Number,
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
