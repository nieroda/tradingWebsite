const express         = require('express')
const bodyParser      = require('body-parser')
const methodOverride  = require('method-override')
const redis           = require('redis')
const myRoutes        = require('./routes/router')
const passport        = require('passport')
const session         = require('express-session')
const app             = express();



//this will throw an error if you dont have a local instance of redis running
//let client = redis.createClient();
//client.on('connect', () => { console.log('connected to redis') })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: 'FEEF046EC5DDA03961323E1EA9F10C33'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
//app.use('/', myRoutes)
//app.use('/', checker.isLoggedIn / * auth middleware */ , myRoutes);



//FEEF046EC5DDA03961323E1EA9F10C33&format=jsonw




const port = process.env.PORT || 3001;
const ip = process.env.IP || '192.168.1.1';

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})
