// TEST FILE
/*
const { dataMap }   = require('./maps/itemKeyMap')
const { EffectMap } = require('./maps/itemEffectMap')
//to want NEED BETTER DATA
const stepData = [ { marketHashName: 'Vintage Scotsman\'s Stove Pipe',
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
    idx: 300 },
  { marketHashName: 'Vintage Bill\'s Hat',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfTYffEcEJhnqWSMU5OD2NgLxXcNnChXOjLx2Sk5MbUqMcbBnQz4ruyeU3DyZTj7LSjVEGFkHPEJYHbZ_DOi4uuURDiYE-x9EgEHfKdR8DEbPJqAOhE7h9YO-TztwBwlTBUqPNVId8dd37d5',
    effect: null,
    category: 'Vintage',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 318 },
  { marketHashName: 'The Buffalo Steak Sandvich',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUwUEWx3jtDd8m9zjDPmzBOESnN97vJJWizdpk1J9bLSxZm4zdlGQWPELCKM7rQm1DCFqvpAzVY7i9etQeRKv6tV06ET7Xg',
    effect: null,
    category: 'Unique',
    type: 'Secondary weapon',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 660 },
  { marketHashName: 'Unusual Hong Kong Cone',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnqWSMU5OD2IwJkXVZnihXOjLx2Sk5MbUqMcbBnQz4ruyeU3L2ZDuWf3CKI1ZnE-QxbjeHqVz2urPBLWSYA795XQhVevAF8GZBPMyJPRpohYFd-GbswhV-S0B_dJQeKVe6zncXNOt2zHZcNcUFbK_2cpI',
    effect: 'Sunbeams',
    category: 'Unusual',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 138 },
  { marketHashName: 'Unusual Tavish DeGroot Experience',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgENewwuWR7vtwdQidvuBfOYN-wBid0wq5MCjWAykAJ6bebgZjQ3I1GVUvcNXqM78Fq9UX8x7ZUyA4_n8elUfl_x9NyRj4rKsvg',
    effect: 'Sunbeams',
    category: 'Unusual',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 130 },
  { marketHashName: 'Strange Unusual Bonk Boy',
    appid: '440',
    tradable: 1,
    marketTradableRestriction: '7',
    image: 'http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEJYwkaYhbjqzN8hMn0CvfCCbRXyd5msZIGiWU8xVIoY7KxYm43I1eaBPlcBaxvo1vuWX5iu5c0UJmm-bzNIXyq-A',
    effect: 'Sunbeams',
    category: 'Unusual',
    type: 'Cosmetic',
    exterior: null,
    quality: null,
    selected: false,
    filtered: false,
    idx: 121 } ]
let newData = []

stepData.forEach(item => {
  //perhaps use string
  //ex
  //item: "us" -> unusual strange
  let vintage = unusual = genuine = strange = false;
  // or ?
  let itemData = ''
  let { marketHashName, effect } = item

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

  t = t ? t.idx : 9999

  newData.push({
    item_id: t,
    effect:  EffectMap[effect] || null,
    itemData,
  })

})
console.log(newData)

//console.log(dataMap)
*/
