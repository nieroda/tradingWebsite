import axios from 'axios'

exports.getTF2Item = async ( steam64id ) => {
  try {
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
      return response
  } catch (e) {
    return { error: true }
  }
}
