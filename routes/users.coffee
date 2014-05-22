express = require 'express'
router = express.Router()
accountManager = require './account-manager'


mongoose = require('mongoose');
familySchema = mongoose.model('familySchema');
memberSchema = mongoose.model('memberSchema');

#TODO: Make this lead to a list of family members?
router.get '/', (req, res) ->
  if req.session.family
    res.render 'users/family', {family: res.session.family}
  else
    res.render 'users/login', {}

router.get '/login', (req, res) ->
  if req.session.family
    res.render 'users/login', {error: "Already logged in"}
  else
    res.render 'users/login', {}

router.get '/new', (req, res) ->
  console.log "Creating new user"
  res.render 'users/new'

router.get '/family', (req, res) ->
  console.log "Listing family members"
  members = req.session.family.members


  res.render( 'users/family', {
      title : 'Family Members',
      'members' : members
  });

router.post '/addMember', (req, res) ->
  name = req.param 'name'
  picture = req.param 'picture'
  role = req.param 'role'

  newMember = new memberSchema(
    name: name
    picture: picture
    role: role
  )
  memberModel = memberSchema;
  newMember.save (err, newObj) ->
    if (err)
      res.send(err, 400)
    else
      familySchema.findByIdAndUpdate(
        req.session.family.id,
        $push:
          members: newObj.id,
        safe: true
        upsert: true,
        (err, model) ->
          if (err)
            console.log('adding failed: ' + err)
          else
            res.redirect 'users/family'
      );
  

#submit password
router.post '/validate', (req, res) ->
  user = req.param "username"
  password = req.param "password"
  familySchema.findOne({username: user, pword: password}, (error, obj) ->
    if !obj
      res.send(error, 400) 
    else 
      req.session.family = obj
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
    members: []
  )
  newUser.save (err, familySchema) ->
    if (err) 
      console.log("DID NOT SAVE")
      res.send(err, 400)
    else
      console.log "saved"
      res.send(newUser, 200)

module.exports = router