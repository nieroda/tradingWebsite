const axios     = require('axios')
const fs        = require('fs')
const data      = require('../tfItems.json')
const jwt       = require('jsonwebtoken')
const userModel = require('../models/userModel')
const tradeModel = require('../models/tradeModel')
const AsyncLock = require('async-lock');
const Lock      = new AsyncLock()


exports.getAllTF2Items = (req, res) => {
  res.status(200).json(data)
}

exports.newTrade = (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  let { selectedItems, toWantSelectedItems, value } = req.body
  jwt.verify(token, "SHITTYSECRETKEY", (err, decoded) => {
    let { _id, steam64ID } = decoded
    Lock.acquire(steam64ID.substring(10), async () => {
      console.log('lock aquired')
      let userRef = await userModel.findOne({ _id })
      if (userRef.tradesOpen >= 5) res.json({ error: "Too Many Trades Open" })
      let newTrade = await tradeModel.create({ description: value })
      newTrade.toHave.push(selectedItems)
      newTrade.toWant.push(toWantSelectedItems)
      newTrade.save()
      userRef.trades.push(newTrade)
      userRef.save()
      return
    }).then(() => {
      console.log('Lock Released')
    });
    console.log(userRef)
  })
  res.send("oh boy")
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

  			response.push(data)
  		});
      res.status(200).json(response)
  } catch (e) {
    res.status(429).json({ error: e })
    //429
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
      selected: false,
      filtered: false,
      category: null,
      type: null,
      qualtiy: null
      /*craft_class,*/
      /*used_by_classes: used_by_classes || []*/
    })
  })
  console.log(JSON.stringify(allTF2Items))
}


//getItems()
