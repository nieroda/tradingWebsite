const { commentModel,
        tradeModel,
        userModel } = require('./index.js')

const mongoose = require('mongoose');

const dummyItems = [
  { marketHashName: 'Mann Co. Supply Crate Key',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ',
    category: 'Unique',
    type: 'Tool',
    exterior: null,
    quality: null },
  { marketHashName: 'Mann Co. Supply Crate Key',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ',
    category: 'Unique',
    type: 'Tool',
    exterior: null,
    quality: null },
]

const otherDummyItems = [
  { marketHashName: 'Mann Co. Supply Crate Key',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ',
    category: 'Unique',
    type: 'Tool',
    exterior: null,
    quality: null },
  { marketHashName: 'Mann Co. Supply Crate Key',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ',
    category: 'Unique',
    type: 'Tool',
    exterior: null,
    quality: null },
]

let newUser = {
  name: "Nathan",
  steamID: "34534534534",
  tradesOpen: 0,
  profileVisits: 0
}

let newTrade = {
  description: "Bleh Blue Blah",
  toHave: otherDummyItems,
  toWant: dummyItems
}

let newComment = {
  name: "Koosh",
  steam64ID: "345345345",
  comment: "Nice item, ill pay you 99 keys for it!?"
}



//console.log(commentModel)
const createUser = async () => {
  await userModel.remove({})
  let user = await userModel.create(newUser)
  let trade = await tradeModel.create(newTrade)
  let comment = await userModel.create(newComment)
  trade.comments.push(comment)
  trade.save()
  user.trades.push(trade)
  user.save()
  console.log(user)
}

const queryUser = async () => {
  userModel.findOne({ _id: "5ae402d6509b6e71e133ddbe"}).populate('trades').exec((err, data) => {
    console.log(data.trades)
  })

}

queryUser()
