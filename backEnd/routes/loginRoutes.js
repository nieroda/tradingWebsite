const express = require('express')
      Router  = express.Router()

const {
  newTrade
} = require('../api/app')


Router.route("/new")
        .post(newTrade)

module.exports = Router
