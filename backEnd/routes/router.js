const express = require('express')

const { getTF2Item } = require('../api/app')

const Router = express()


const exampleFunction = (req, res) => {
  res.json('{error:true}')
}

Router.route('/')
    .get(exampleFunction)
    //.post()
    //.put()
    //.delete()

Router.route('/backpack/:steam64id')
  .get(getTF2Item)

//Router.route('/getItems/:user')
  //.get()
  //.post()
  //.put()
  //.delete()


module.exports = Router;
