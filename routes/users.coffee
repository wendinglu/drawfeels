express = require 'express'
router = express.Router()
accountManager = require './account-manager'

#TODO: Make this lead to a list of family members?
router.get '/', (req, res) ->
  db = req.db
  if res.session.user
    res.render 'users/family', {user: res.session.user}
  else
    res.render 'users/login', {}

router.get '/login', (req, res) ->
  res.render 'users/login', {}

#submit password
router.post '/validate', (req, res) ->
  accountManager.login req.param 'username', req.param 'password', (error, user) ->
    if !user then res.send(error, 400) 
    else 
      req.session.user = user
      res.send user, 200

#submit new user add
router.post '/create', (req, res) ->
  console.log("hi")
  username = req.param 'username'
  password = req.param 'password'
  #TODO: add user to database

module.exports = router