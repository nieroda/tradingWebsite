const Joi = require('joi');


//Much better
const newSanatizeSchema = Joi.object().keys({
  item_id:      Joi.number().min(0).max(999).allow(9999).required(), //We MUST figure out what items we are not supporting
  effect:       Joi.number().min(0).max(104).allow(null).required(),
  itemData:     Joi.string().min(0).max(4).required(),               //Or Perhaps REGEX
})

const textSchema = {
    value: Joi.string().min(0).max(200).required()
};

exports.sanatizeValueSchema = item => {
  let { error } = Joi.validate({ value: item }, textSchema)
  console.log(`Result is ${!!!error}`)
  return !!!error
}

exports.newSanatizeTest = array => {
  let err = false
  array.forEach(item => {
    let { error } = Joi.validate(item, newSanatizeSchema)
    if (error) err = true
  })
  console.log(`Result is ${err}`)
  return err
}


//as an example
let newTestData = [
  { item_id: 80, effect: null, itemData: 'v' },
  { item_id: 86, effect: null, itemData: 'v' },
  { item_id: 251, effect: null, itemData: '' },
  { item_id: 9999, effect: 6, itemData: 'u' },
  { item_id: 505, effect: 6, itemData: 'u' },
  { item_id: 368, effect: 6, itemData: 'su' }
]


//Alow item data to be empty! REGEX




//console.log(newSanatizeTest(newTestData))
