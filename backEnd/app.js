const express         = require('express')
const bodyParser      = require('body-parser')
const methodOverride  = require('method-override')
const redis           = require('redis')
const myRoutes        = require('./routes/router')
const app             = express();


//this will throw an error if you dont have a local instance of redis running
//let client = redis.createClient();
//client.on('connect', () => { console.log('connected to redis') })



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //not needed
app.use(methodOverride('_method'));               //not needed
app.use(express.static('public'));


app.use('/', myRoutes)
//app.use('/', checker.isLoggedIn / * auth middleware */ , myRoutes);



//http://api.steampowered.com/<interface name>/<method name>/v<version>/?key=FEEF046EC5DDA03961323E1EA9F10C33&format=jsonw

//https://steamcommunity.com/profiles/76561198073134556/inventory/json/730/2


const port = process.env.PORT || 3001;
const ip = process.env.IP || '192.168.1.1';

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})
