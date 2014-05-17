express = require 'express'
router = express.Router()

//TODO: Make this lead to a list of family members?
router.get '/', (req, res) ->
  db = req.db
  res.render 'userlist', {}

router.get '/login', (req, res) ->
  res.render 'users-login', {}

module.exports = router