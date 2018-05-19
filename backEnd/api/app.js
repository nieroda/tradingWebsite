const axios      = require('axios')
const fs         = require('fs')
const data       = require('../tfItems.json')
const jwt        = require('jsonwebtoken')
const userModel  = require('../models/userModel')
const tradeModel = require('../models/tradeModel')
const AsyncLock  = require('async-lock');
const Lock       = new AsyncLock()

//Sanitize Input
const {
  newSanatizeTest,
  sanatizeValueSchema
} = require('../validation/validator')


//const oh = console.log



exports.getAllTF2Items = (req, res) => {
  res.status(200).json(data)
}

exports.getUsersTrades = async (req, res) => {

  //const token = req.headers.authorization.split(" ")[1]

  try {
    //let { _id } = jwt.verify(token, 'SHITTYSECRETKEY');

    let user = await userModel.findOne({ steam64ID: req.params.steam64id }).populate('trades')
    res.status(200).json(user)
  } catch(error) {
    return next({
      status:404,
      error
    })
  }

}

exports.newTrade = (req, res, next) => {
  //We need to get the JWT token out of the headers
  //We already know one exists
  const token = req.headers.authorization.split(" ")[1]

  //Destructure the values being sent to us by the React Client { MAKE TRADE }
  let { selectedItems, toWantSelectedItems, value } = req.body
  //This should work
  if ((!newSanatizeTest(toWantSelectedItems) ||
       !newSanatizeTest(selectedItems))      ||
       !sanatizeValueSchema(value)) {
        //Params have been tampered with
        //I dont think we want to tell them bad input. Just throw 404?
        return next({
          status: 404,
          message: "Internal Error"
        })
      }

  jwt.verify(token, "SHITTYSECRETKEY", (err, decoded) => {

    let { _id, steamid } = decoded

    Lock.acquire(steamid, async () => {

      let userRef = await userModel.findOne({ _id })
      if (userRef.tradesOpen >= 5) {
        /*return*/ next({
          status: 403,
          message: "Too Many Trades Open"
        })
      }
      await userRef.update({ $inc: { tradesOpen: 1 } })

      //We create a new mongoTrade
      let newTrade = await tradeModel.create({ description: value })

      //We add both the toWant Array and the toHave array to the object
      //And then save it
      newTrade.toHave.push(selectedItems)
      newTrade.toWant.push(toWantSelectedItems)
      await newTrade.save()

      //We now add the trade to the user object and save it
      userRef.trades.push(newTrade)
      await userRef.save()

    }).then(() => {

      //We release the lock now
      res.send("gud")
    }).catch(e => {
      return next({
        status: 400,
        message: e
      })
    })

  })
  //res.send("oh boy")
}

//will need to have hundreds of proxies... $$$
exports.getTF2Item = async (req, res, next) => {
  try {
    console.log('called')
    let { steam64id } = req.params
    let { data: { rgInventory, rgDescriptions } } = await axios.get(`https://steamcommunity.com/profiles/${steam64id}/inventory/json/440/2`)
    let response = []
    Object.keys(rgInventory).forEach((key, idx) => {
  			let temp = rgInventory[key];
  			let item = rgDescriptions[`${temp.classid}_${temp.instanceid}`];

  			if (!item) {
  				return response.push({error: true});
  			}

  			let data = {
  				marketHashName: item.market_hash_name,
  				appid: item.appid,
  				tradable: item.tradable,
  				marketTradableRestriction: item.market_tradable_restriction,
  				image: `http://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`,
          effect: null, /* only if unusual */
  				category: null,
  				type: null,
  				exterior: null,
  				quality: null,
          selected: false,
          filtered: false,
          idx
  			};

  			item.tags.forEach(tag => {
  				if (tag.category === 'Type') {
  					data.type = tag.name
  				}
  				if (tag.category === 'Weapon') {
  					data.weapon = tag.name
  				}
  				if (tag.category === 'Quality') {
  					data.category = tag.name
  				}
  				if (tag.category === 'Exterior') {
  					data.exterior = tag.name
  				}
  			});

        if (data.category === 'Unusual') {
          item.descriptions.forEach(desc => {
            if (desc.value.includes("★ Unusual Effect:")) {
              data.effect = desc.value.match(/★ Unusual Effect: (.*)/)[1]
            }
          })
        }
  			response.push(data)
  		});
      res.status(200).json(response)
  } catch (e) {
    res.status(429).json({ error: e })
    //429
    console.log('fail')
    console.log(e)
  }
}

const getItems = async () => {
  let allTF2Items = []
  let { data: { result: { items } } } = await axios.get(`http://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001/?key=457CFC04D902AE384D6CA05904A1C362&language=en`)

  items.forEach((item, idx) => {
    let { item_name, image_url, craft_class, used_by_classes } = item
    //if (image_url === null) console.log(item)
    allTF2Items.push({
      item_name,
      idx,
      image: /*image_url || null,*/ image_url ? image_url.substring(45) : null,
  //    selected: false,
  //    filtered: false,
  //    category: null,
  //    type: null,
  //    quality: null
      /*craft_class,*/
      /*used_by_classes: used_by_classes || []*/
    })
  })
  console.log(JSON.stringify(allTF2Items))
}

//getItems()
//getItems()
