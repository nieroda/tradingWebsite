var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
//var config = require('./config/config');
var steamStrategy = require('passport-steam').Strategy;
var passport = require('passport');
var userModel   = require('./models/userModel');
var session = require('express-session')
var app = express();

const { getTF2Item, getAllTF2Items } = require('./api/app')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
mongoose.connect(`mongodb://nkamm:boson@ds014658.mlab.com:14658/testlab`);


passport.use(new steamStrategy({
    returnURL: 'http://localhost:1337/auth/return/steam',
    realm: 'http://localhost:1337/',
    apiKey: '457CFC04D902AE384D6CA05904A1C362'
  },
  (identifier, profile, done) => {
    process.nextTick(
      () => {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  () => {});

app.get('/auth/return/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      let { displayName } = req.user
      let { steamid, profileurl, avatarmedium } = req.user._json
      //await userModel.remove({})
      let result = await userModel.find({ steam64ID: steamid })
      console.log(result)
      if (result.length === 0) {
        //no user is registered
        let newUser = await userModel.create({
          displayName,
          profileurl,
          avatarmedium,
          steam64ID: steamid,
        })
        //console.log(newUs)
        let { _id } = newUser
        let token = jwt.sign({ _id, steamid, displayName, profileurl, avatarmedium, tradesOpen: 0 }, "SHITTYSECRETKEY");
        console.log(token)
        res.cookie('token', token);
        //sendToken(token, res)
      } else {
        let { _id, steam64ID, displayName, tradesOpen, avatarmedium } = result[0]
        let token = jwt.sign({ _id, steamid, displayName, profileurl, tradesOpen, avatarmedium }, "SHITTYSECRETKEY")
        res.cookie('token', token);

      }

      res.redirect('http://localhost:3000/finishedSignin');
    } catch (e) {
      //...
      console.log(e)
      res.redirect('http://localhost:3000/finishedSignin');
    }

  }
);

app.get('/inventory/:steam64id', getTF2Item)
app.get('/TF2Items/all', getAllTF2Items)

//http://media.steampowered.com/apps/440/icons/

var port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Listening on port ${port}`))
