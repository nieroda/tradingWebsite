const { dataMap } = require('./itemKeyMap.js')

//to want NEED BETTER DATA
const testData = [ { item_name: 'Minigun',
    idx: 15,
    image: 'w_minigun.92362e2a8d60b5dd050c0e85e911ee1499a7b559.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Revolver',
    idx: 24,
    image: 'w_revolver.9b4a43c8ce5797a08d0dfb5d9d5bfb1b90928008.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Horseless Headless Horsemann\'s Head',
    idx: 222,
    image: 'pumkin_hat.ccaeeb1e364755b7ca137c26f33dcb5b6f372051.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Noise Maker - Stabby',
    idx: 231,
    image: 'noisemaker_stabby.c3985828ee6433c18a95dd396205dc756522f026.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Noise Maker - TF Birthday',
    idx: 438,
    image: 'noisemaker_birthday.7ed89b3d9780fce251833e7aec610a502703be06.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Company Man',
    idx: 429,
    image: 'dex_hat.9ff579975da28c68317a9d5483b4de7030662b98.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Original',
    idx: 419,
    image: 'c_bet_rocketlauncher.82e06d0cc0c9eb80179358ebe0d85d483018de4d.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null },
  { item_name: 'Deus Specs',
    idx: 428,
    image: 'dex_glasses.fc5a5274787cce4d0a5ff5a9da64944710d9a32a.png',
    selected: false,
    filtered: false,
    category: null,
    type: null,
    qualtiy: null } ]

let newData = []
testData.forEach(item => {
  console.log(dataMap[item.item_name])
})

//console.log(dataMap)