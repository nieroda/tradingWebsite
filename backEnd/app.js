const express          = require('express'),
      bodyParser       = require('body-parser'),
      cookieParser     = require('cookie-parser'),
      mongoose         = require('mongoose'),
      jwt              = require('jsonwebtoken'),
      steamStrategy    = require('passport-steam').Strategy,
      passport         = require('passport'),
      userModel        = require('./models/userModel'),
      session          = require('express-session'),
      errorHandler     = require('./error'),
      loginRoutes      = require('./routes/loginRoutes'),
      authRoutes       = require('./routes/authRoutes')
      app              = express()

const { loginRequired, userAuth } = require("./middleware/auth")

const { testEndpoint } = require('./api/app')

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
      let result = await userModel.find({ steam64ID: steamid })
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

/* Login Required Routes */
app.use('/TF2', loginRequired, loginRoutes);

/* Login + Auth Required Routes */
app.use('/TF2Trade/:steamID', loginRequired, userAuth, authRoutes)

//http://media.steampowered.com/apps/440/icons/

app.use((req, res, next) => {
  let err = new Error("4040404 Not Found")
  err.status = 404
  next(err)
})

app.use(errorHandler)


var port = process.env.PORT || 1337; //l33t!!
app.listen(port, () => console.log(`Listening on port ${port}`))
