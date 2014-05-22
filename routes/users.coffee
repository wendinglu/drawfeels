express = require 'express'
router = express.Router()
accountManager = require './account-manager'


mongoose = require('mongoose');
familySchema = mongoose.model('familySchema');
memberSchema = mongoose.model('memberSchema');

#TODO: Make this lead to a list of family members?
router.get '/', (req, res) ->
  if req.session.family
    res.render 'users/family', {family: req.session.family}
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
  
  renderMembers = (id, callback) ->
    console.log("finding #{id}")
    familySchema.findOne({_id: id}, (err, doc) ->
      if (err)
        callback(err, null)
      else
        callback(null, doc)
    )
  
  renderMembers req.session.family._id, (err, family) ->
    if (err)
      console.log(err)
    else
      if family
        res.render( 'users/family', {
            title : 'Family Members',
            'members' : family.members
        })
      else
        res.send(400)

router.post '/addMember', (req, res) ->
  name = req.param 'name'
  picture = req.param 'picture'
  role = req.param 'role'

  newMember = new memberSchema(
    name: name
    picture: picture
    role: role
  )

  console.log "Adding member to session:"
  console.log req.session

  newMember.save (err, newObj) ->
    if (err)
      console.log("Could not create new family member")
      res.send(err, 400)
    else
      console.log("created new family member")

  console.log ("Looking to update id: #{req.session.family._id}")
  familySchema.findByIdAndUpdate(req.session.family._id,
    $push:
      members: newMember.id,
    safe: true
    upsert: true,
    (err, model) ->
      if (err)
        console.log('adding failed: ' + err)
        res.send(err, 400)
      else
        console.log('succeed in appending')
        res.redirect('/users/family')
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