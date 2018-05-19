const { dataMap }   = require('./maps/itemKeyMap')
const { EffectMap } = require('./maps/itemEffectMap')
const { idxToItem } = require('./maps/idxToItem')

//Format data for react component state
exports.formatData = data => {
  let newData = []
  data.forEach(
    ({ item_id, effect, itemData }) => {
      newData.push({
        vintage: itemData.includes('v'),
        genuine: itemData.includes('g'),
        strange: itemData.includes('s'),
        unusual: itemData.includes('u'),
        effect: EffectMap[effect],
        ...idxToItem[item_id],
      })
    }
  )
  return newData
}

/*
Compresses data in this format
{ marketHashName: 'Vintage Scotsman\'s Stove Pipe',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnuHWVVIOM0d0P0ipRzzNfKS32zjt5avVTMMrS_wn6s-WIUnDza2DHK3LYHQw5T7ZWPW_f-TOttr_GRTvOQOwoQQ9XefMNp2QYac2Xf0xqwsBoL5w',
    effect: null,
    category: 'Vintage',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 300
  }
*/

//We may need to split this up
exports.compressData = array => {
  let newData = []
  array.forEach(item => {
    let vintage = unusual = genuine = strange = false;
    // or ?
    let itemData = ''
    let { marketHashName, item_name , effect } = item

    if (marketHashName === undefined) marketHashName = item_name
    //Remove strange set true
    if (marketHashName.includes("Strange")) {
      strange = true
      itemData += 's'
      marketHashName = marketHashName.replace("Strange ", "")
    }

    //Remove Vintage set true
    if (marketHashName.includes("Vintage")) {
      vintage = true
      itemData += 'v'
      marketHashName = marketHashName.replace("Vintage ", "")
    }

    //Remove Genuine set true
    if (marketHashName.includes("Genuine")) {
      genuine = true
      itemData += 'g'
      marketHashName = marketHashName.replace("Genuine ", "")
    }

    //Remove unusual. get effect y mas
    if (marketHashName.includes("Unusual")) {
      unusual = true
      itemData += 'u'
      marketHashName = marketHashName.replace("Unusual ", "")
    }


    let t  = dataMap[marketHashName]
    //Some are undef(MUST FIX)
    //* URGENT **? @ nupkick

    t = t ? t.idx : 9999

    newData.push({
      item_id: t,
      effect:  EffectMap[effect] || null,
      itemData,
    })
  })
  return newData
}
