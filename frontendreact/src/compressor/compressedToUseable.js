//TEST FILE

//const { dataMap }   = require('./itemKeyMap')
/*

const { idxToItem } = require('./maps/idxToItem')
const { EffectMap } = require('./maps/itemEffectMap')

exports.makeUseable = data => {
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


//console.log(idxToItem)

let dummyData = [
  { item_id: 80, effect: null, itemData: 'v' },
  { item_id: 86, effect: null, itemData: 'v' },
  { item_id: 251, effect: null, itemData: '' },
  { item_id: 9999, effect: 6, itemData: 'u' },
  { item_id: 505, effect: 6, itemData: 'u' },
  { item_id: 368, effect: 6, itemData: 'su' }
]

let newData = []
dummyData.forEach(
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

console.log(newData)

=> {
  marketHashName: 'wBid0wq5MCjWAykAJ6bebgZjQ3I1GVUvcNXqM78Fq9UX8x7ZUyA4_n8elUfl_x9NyRj4rKsvg',
  image: 'w_shotgun.781e0a03e8536215731d276a911c5753e42901d4.png',
  vintage: false,
  genuine: false,
  strange: false,
  unusual: false,
  effect: "Burning Flames" || null,
}

*/
