express = require 'express'
router = express.Router()
accountManager = require './account-manager'

mongoose = require('mongoose');
familySchema = mongoose.model('familySchema');

#TODO: Make this lead to a list of family members?
router.get '/', (req, res) ->
  if req.session.user
    res.render 'users/family', {user: res.session.user}
  else
    res.render 'users/login', {}

router.get '/login', (req, res) ->
  if req.session.user
    res.render 'users/login', {error: "Already logged in"}
  else
    res.render 'users/login', {}

router.get '/new', (req, res) ->
  console.log "Creating new user"
  res.render 'users/new'

#submit password
router.post '/validate', (req, res) ->
  user = req.param "username"
  password = req.param "password"
  familySchema.findOne({username: user, pword: password}, (error, obj) ->
    if !obj
      res.send(error, 400) 
    else 
      console.log(req.session)
      req.session.user = obj.username
      console.log(req.session)
      res.send obj, 200
  )

#submit new user add
router.post '/create', (req, res) ->
  name = req.param 'name'
  username = req.param 'username'
  password = req.param 'password'

  newUser = new familySchema(
    name: name
    username: username
    pword: password
  )
  newUser.save (err, familySchema) ->
    if (err) 
      console.log("DID NOT SAVE")
      res.send(err, 400)
    else
      console.log "saved"
      res.send(newUser, 200)

module.exports = router