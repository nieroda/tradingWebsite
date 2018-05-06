var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
//var config = require('./config/config');
var steamStrategy = require('passport-steam').Strategy;
var passport = require('passport');
var userModel   = require('./models/userModel');
var session = require('express-session')
var app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
mongoose.connect(`mongodb://nkamm:boson@ds014658.mlab.com:14658/testlab`);

app.post('/auth/signup',  async (req, res) => {
  let user = await UserModel.create(req.body)
  console.log(user)

  let { id, email } = user
  let token = jwt.sign({ id, email }, "asdfasdfasdf");


  return res.status(200).json({
    id,
    username,
    profileImageUrl,
    token
  })
/*
  user.save(function(err){
    if(err){ throw err; }
    sendToken(user, res)
    res.sendStatus(200)
  }) */
})

app.post('/auth/login', function(req, res){
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(err) throw err;
    if(!user){
      res.status(403).send({msg: "User name or password is incorrect."});
    } else {
      user.comparePassword(req.body.password, function(err, response){
        if(response && !err){
          sendToken(user, res);
          res.sendStatus(200);
        } else {
          res.status(403).send({msg: 'Authentication failed.  Wrong password.'})
        }
      })
    }
  })
})

//Members
/*
app.get('/member/logout', function(req, res){
  res.clearCookie('token', {path: '/'});
  res.send();
})
*/

var sendToken = function(user, res){
  var token = jwt.encode(user, config.secret);
  res.cookie('token', token);
}

//Steam Authentication
passport.use(new steamStrategy({
    returnURL: 'http://localhost:1337/auth/return/steam',
    realm: 'http://localhost:1337/',
    apiKey: '457CFC04D902AE384D6CA05904A1C362'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req)
    console.log('finished')
  }
);

app.get('/auth/return/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req)
    //var token = req.cookies.token;
    //var decoded = jwt.decode(token, 'asdfasdf');
    //User.update(
  //    {email: decoded.email}, {$set: {steam: req.user._json}
//    }, function(err, user){
//      res.redirect('/#/member/dashboard')
//    })
res.redirect('http://localhost:3000');

  }
);

//Registration
app.post('/register/find', function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err;
    if(!user){
      res.sendStatus(401)
    } else {
      res.send(user)
    }
  })
})

app.post('/register/register', function(req, res){
  User.update(
    {email: {$in: req.body.members}}, {$set: {team: req.body}}, {multi: true}
    , function(err, user){
      res.sendStatus(200)
    }
  )
})

var port = process.env.PORT || 1337;
app.listen(port, function(){ console.log("Listening on port " + port)})
