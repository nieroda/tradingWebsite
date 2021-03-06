/*

Redis Cache Design

-> global:timeline -> hmset
   userid:timeline -> hmset also a linkedlist

   _id23423423234:timeline -> is the linked list in cache of the user


*/

//redis-server
//new window
//redis-cli

//lpush <s64id> object(serialized json)
//lrange nathan 0 -1

//You can use LPUSH together with LTRIM to create a list that never exceeds a given number of elements, but just remembers the latest N elements.
//to max at 10 we can use LTRIM
//LTRIM <s64id> 0 10



//const express = require('express')
//const exphbs = require('express-handlebars')
//const path = require('path')
//const bodyParser = require('body-parser')
//const methodOverride = require('method-override')
const redis = require('redis')

//create redis client
let client = redis.createClient();
client.on('connect', () => { console.log('connected to redis') })


const nathan = "76561198197292179"
const mongoID = "_id507f191e810c19729de860ea"
const toWant = [{"item_id":80,"effect":null,"itemData":"v"},{"item_id":86,"effect":null,"itemData":"v"},{"item_id":251,"effect":null,"itemData":""},{"item_id":9999,"effect":6,"itemData":"u"},{"item_id":505,"effect":6,"itemData":"u"},{"item_id":368,"effect":6,"itemData":"su"}]


const fakeTrade = {
  user: nathan,
  mongoID,
  toWant,
  toHave: toWant
}

//console.log(JSON.stringify(fakeTrade))

//Insert Into LinkedList Nathan
const insertLinkedList = nathan => {
  return new Promise((resolve, reject) => {
    client.lpush(`trade:${nathan}`, JSON.stringify(fakeTrade), (err, resp) => {
      if (err) reject(`fuck ${JSON.stringify(err)}`)
      else {
        console.log('done')
        resolve(`no err ${resp}`)
      }
    })
  })
}

const trimTrade = nathan => {
  client.ltrim(`trade:${nathan}`, '0', '9', (err, resp) => {
    if (err) console.log(err + " error")
    console.log('resp')
    console.log(resp)
  })
}

const queryRedis = nathan => {
  client.lrange(`trade:${nathan}`, '0', '-1', (err, resp) => {
    console.log(resp.length)
  })
}


insertLinkedList(nathan)
  .then(() => {
    queryRedis(nathan)
    trimTrade(nathan)
  })
  .catch(oops => console.log(oops))




//const insert

//set port !
//const port = 3000
//const app = express()

//view engine
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//app.set('view engine', 'handlebars')

//body-parser
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

//method override
//app.use(methodOverride('_method'))
/*
app.get('/', (req, res, next) => {
  res.render('searchusers')
})



app.post('/user/search', (req, res, next) => {
  let id = req.body.id
  client.hgetall(id, (err, obj) => {
    if (!obj) {
      res.render('searchusers', { error: 'User does not exist' })
    } else {
      obj.id = id;
      res.render('details', { user: obj })
    }
    })
});

//add user page
app.get('/user/add', (req, res, next) => {
  res.render('adduser')
})

app.get('/tweets', (req, res, next) => {


  res.render('makeTweet');
})

app.post('/tweets', (req, res, next) => {
  let { username, tweet } = req.body
  //console.log(`${username} :: ${tweet}`)
  client.lpush('global:timeline', `Message from ${username}: The tweet is ${tweet}`, (err, reply) => {
    console.log(err)
    console.log(reply)
  });
  res.render('makeTweet')
});

app.get('/all', (req, res, next) => {

  client.lrange('global:timeline' , '0' , '-1', (err, resp) => {
    res.render('all', {resp});
  })


})



//process add user page
app.post('/user/add', (req, res, next) => {
  let { id, first_name, last_name, email, phone } = req.body

  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], (err, reply) => {
    if (err) console.log(err)
    console.log(reply)
    res.redirect('/')
  })
})

app.get('/login', (req, res, next) => {
  res.render('login')
});

app.get('/register', (req, res, next) => {
  res.render('register')
});

app.post('/register', (req, res, next) => {
  let = { username, password } = req.body

  client.get(username, (err, resp) => {
    if (resp != null) res.render('register', {error: 'Username Already Taken'})
    client.set(username, password, (err, resp) => {
      console.log(err)
      console.log(resp)
    });
  })

});

app.post('/login', (req, res, next) => {
  let = { username, password } = req.body
  console.log(req.body)

  client.get(username, (err, resp) => {
    if (resp == null) res.render('login', {error: 'Invalid'})
    if (!err) {
      if (resp == password) console.log('validated')
      res.render('login')
    } else {
      console.log(err)
      res.render('login')
    }
  })

});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})*/
