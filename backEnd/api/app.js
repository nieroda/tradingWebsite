const axios = require('axios');

//will need to have hundreds of proxies... $$$
exports.getTF2Item = async (req, res, next) => {
  try {
    console.log('called')
    let steam64id = req.params.steam64id
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
