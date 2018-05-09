const express = require('express')
      Router  = express.Router()

const {
  getTF2Item,
  getAllTF2Items
} = require('../api/app')


Router.route("/inventory/:steam64id")
        .get(getTF2Item)

Router.route("/Items/All")
        .get(getAllTF2Items)


module.exports = Router
