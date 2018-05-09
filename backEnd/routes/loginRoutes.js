const express = require('express')
      Router  = express.Router()

const {
  getTF2Item,
  getAllTF2Items,
  getUsersTrades
} = require('../api/app')


Router.route("/usersTrades/:steam64id")
        .get(getUsersTrades)

Router.route("/inventory/:steam64id")
        .get(getTF2Item)

Router.route("/Items/All")
        .get(getAllTF2Items)


module.exports = Router
