const Joi = require('joi');


const toWantSchema = Joi.object().keys({
    item_name: Joi.string().max(30).required(),
    idx:       Joi.number().min(0).max(4000).required(),
    image:     Joi.string().regex(/*/._\w+..+.png/*/ /.*.png/ /*we need better regex */).required(),
    selected:  Joi.boolean().required(),
    filtered:  Joi.boolean().required(),
    category:  Joi.string().max(20).allow(null).required(),
    type:      Joi.string().max(20).allow(null).required(),
    qualtiy:   Joi.string().max(20).allow(null).required()
}) /* Quality spelled wrong */

const toHaveSchema = Joi.object().keys({
  marketHashName:            Joi.string().max(50).required(),
  appid:                     Joi.string().max(3).required(),
  tradable:                  Joi.number().min(0).max(1).required(),
  marketTradableRestriction: Joi.number().min(0).max(255).required(),
  image:                     Joi.string().regex(/http:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/.{0,200}/).required(),
  category:                  Joi.string().min(0).max(15).required(),
  type:                      Joi.string().min(0).max(15).required(),
  exterior:                  Joi.string().max(20).allow(null).required(),
  quality:                   Joi.string().max(20).allow(null).required(),
  selected:                  Joi.boolean().required(),
  filtered:                  Joi.boolean().required(),
  idx:                       Joi.number().min(0).max(4000).required()
});

const textSchema = {
    value: Joi.string().min(0).max(200).required()
};

exports.sanatizeValueSchema = item => {
  let { error } = Joi.validate({ value: item }, textSchema)
  return !!!error
}

exports.sanatizeToHaveSchema = array => {
  array.forEach(item => {
    let data = Joi.validate(item, toHaveSchema)
    if (data.error) {
          return false
    }
  })
  return true
}

exports.sanatizeToWantSchema = array => {
  array.forEach(item => {
    let  data  = Joi.validate(item, toWantSchema)
    if (data.error) {
      return false
    }
  })
  return true
}


//console.log(sanatizeValueSchema(a))

// This is Test Data

const selectedItems = [
  { marketHashName: 'Ghastlier Gibus',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuWRTvsTZCnMHpA83eWLBZpNY095dQlzQ9lFV9ZLXkZWYycFOQV_ddXaxi91C6XyFh7J5nAIHm8e4FLVjo4IDYc-577ZDbVzE',
    category: 'Unique',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 1 },
  { marketHashName: 'The Equalizer',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUxcYXhDjoD18m5rZAfOeD-VOwow245UHiGRtlVd4Y-K3Mm4yKwGXB_YNC_dpoAzuWSNn7p4wA9K3oPUWJ1sEtEon8w',
    category: 'Unique',
    type: 'Melee weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 2 },
  { marketHashName: 'Horseless Headless Horsemann\'s Head',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEbeQoaVBXdsDlXt8TnH_WJRuVXyN9ksZYBiWczwVB9ZLW3NDFmIwWQV6FbWaE4ogq1WnJl6sEwUYT457UB_iGk11I',
    category: 'Unique',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 3 },
  { marketHashName: 'The Wrangler',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUxADXBXltD1Rt8TnH_WJRrdSn4JktMcF2GVqyQd_NbHiNjU_IVCUVflcX_M8olq6X35gvJ81V47457UBTPbzYyk',
    category: 'Unique',
    type: 'Secondary weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 4 },
  { marketHashName: 'Power Up Canteen',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEbYxAUTw7yujdXnMTjMv6NGucF1d9stpYDgDI6yVArMbq3ZjQ_cFHHWPAMBPNp8lC8DHRhsZVlVdLl9r5IOVK43gpEMGA',
    category: 'Unique',
    type: 'Usable Item',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 13 },
  { marketHashName: 'The Blutsauger',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUwsUWBjqvy1Nt8TnH_WJRuIDmI1kvJJTjjAzyFl4MrThMTQwdAXDA6JaWaI79li-X3Nm6pQ1Vob457UBFM06SEc',
    category: 'Unique',
    type: 'Primary weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 14 },
  { marketHashName: 'The Axtinguisher',
    appid: '440',
    tradable: 0,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUwYJSRLsvy1Km8DjH82cEfIPpNY095dQlzU9xgd-Z7vgNGZmc1GSB_laXq04oli8WHdiuZ40V9Syru0HegXmtoDYc-57hPrnlJA',
    category: 'Unique',
    type: 'Melee weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 23 },
  { marketHashName: 'Strange Grenade Launcher',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEcUwADWBXjvD1Pid3oDvqJGt8Mmsgy4N4E3GBux1EtN7W0Z2E0K1bAA_kGXaM7pFu4UXYx7cRiAI7gpe5WewvoqsKYZB0bKFy1',
    category: 'Strange',
    type: 'Primary weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 22 } ]

const text = "asdf asdf;alksd a;sdlkfjas;dlkfj s;adlkf jas;ldkfj as;d kas;dlkfj a;sldk ja lajsfs sdlfkjsdf sdlfk"

const testNewItem = [{
    item_name: 'Shovel',
    idx: 148,
    image: 'w_shovel.af4732f0c4d144abfaab15f4caddb975b9055f55.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Wrench',
    idx: 149,
    image: 'w_wrench.c28ea76829f31aa00e65c524aa66c3486f5e6753.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null }]


const newNewTestItem = {
  item_name: 'Shovel',
  idx: 148,
  image: 'w_shovel.af4732f0c4d144abfaab15f4caddb975b9055f55.png',
  selected: false,
  filtered: false,
  category: 123,
  type: 123,
  quality: 234
}
/*
validator(testNewItem).required().isArray(item => {
      validator(item).required().isObject(child => {
        child('item_name').isNumber()
      })
});
*/

const toWantTest = [
  { item_name: 'Shovel',
    idx: 148,
    image: 'w_shovel.af4732f0c4d144abfaab15f4caddb975b9055f55.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Wrench',
    idx: 149,
    image: 'w_wrench.c28ea76829f31aa00e65c524aa66c3486f5e6753.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Bonesaw',
    idx: 150,
    image: 'c_bonesaw.6a7b7e2fee4933e2b5d3cf496f0b9e236265f9bf.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Shotgun',
    idx: 151,
    image: 'w_shotgun.781e0a03e8536215731d276a911c5753e42901d4.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Flame Thrower',
    idx: 160,
    image: 'c_flamethrower.d344f780c361cba3138ec8c887b419917c9ef2b6.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Jumper\'s Jeepcap',
    idx: 338,
    image: 'soldier_jeepcap.7749556fc753bbee5c4acc9a7e5f52e48646b88a.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Aperture Labs Hard Hat',
    idx: 339,
    image: 'hardhat.ccf6804f9d7ff922abe5fa226c815e586151fdf7.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: '\'Fish\'',
    idx: 347,
    image: 'fish.32ac5fd24b63f5b60a70cda336b80b4ff1ce7d6a.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null } ]
