const express = require('express')

const Router = express()


const exampleFunction = (req, res) => {
  res.json('{error:true}')
}

Router.route('/')
    .get(exampleFunction)
    //.post()
    //.put()
    //.delete()

//Router.route('/getItems/:user')
  //.get()
  //.post()
  //.put()
  //.delete()


module.exports = Router;
