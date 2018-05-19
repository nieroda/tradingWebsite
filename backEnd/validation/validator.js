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

let newTestData = [
  { item_id: 80, effect: null, itemData: 'v' },
  { item_id: 86, effect: null, itemData: 'v' },
  { item_id: 251, effect: null, itemData: '' },
  { item_id: 9999, effect: 6, itemData: 'u' },
  { item_id: 505, effect: 6, itemData: 'u' },
  { item_id: 368, effect: 6, itemData: 'su' }
]


//Alow item data to be empty! REGEX
const newSanatizeSchema = Joi.object().keys({
  item_id:      Joi.number().min(0).max(999).allow(9999).required(), //We MUST figure out what items we are not supporting
  effect:       Joi.number().min(0).max(104).allow(null).required(),
  itemData:     Joi.string().min(0).max(4).required(), //regexx would be better...is this best way?
})


const newSanatizeTest = array => {
  let err = false
  array.forEach(item => {
    let { error } = Joi.validate(item, newSanatizeSchema)
    if (error) err = true
  })
  return err
}

console.log(newSanatizeTest(newTestData))
