express = require 'express'
router = express.Router()
accountManager = require './account-manager'


mongoose = require('mongoose');
Family = mongoose.model('familySchema');
Member = mongoose.model('memberSchema');

#main page links to login or choose family members
router.get '/', (req, res) ->
  if req.session.family
    res.redirect 'members'
  else
    res.render 'users/login', {}

# Family functions =======================
# List of family members
router.get '/family', (req, res) ->
  if !req.session.family
    res.redirect 'login'
  else
    console.log "Listing family members"
    renderMembers = (id, callback) ->
      console.log("finding mebers of user: #{id}")
      Family.findOne({_id: id}, (err, family) ->
        if (err)
          callback(err, null)
        else
          Member.where({_id: {$in: family.members}}).exec(callback)
      )
    
    renderMembers req.session.family._id, (err, members) ->
      if (err)
        console.log(err)
      else
        console.log ("Members found are:")
        console.log (members)
        if members
          res.render( 'users/family', {
            title : 'Family Members',
            'members' : members
          })
        else
          res.send(400)


# Create family member
router.post '/addMember', (req, res) ->
  name = req.param 'name'
  picture = req.param 'picture'
  role = req.param 'role'

  newMember = new Member(
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
  Family.findByIdAndUpdate(req.session.family._id,
    $set: 
      nonsense: null,
    $push:
      members: newMember.id,
    safe: true,
    upsert: true,
    (err, model) ->
      if (err)
        console.log('adding failed: ' + err)
        res.send(err, 400)
      else
        console.log('succeed in appending')
        res.redirect('/users/family')
  );

#Login as family member
router.get '/chooseMember', (req, res) ->
  console.log(req.session.family.members)
  console.log(req.query.id)
  if req.session.family
    Family.findOne({_id: req.session.family._id}, (error, fam) ->
      if !fam
        console.log("Family not found")
        res.send(error, 400)
      else if fam.members.indexOf(req.query.id) > -1
        Member.findOne({_id: req.query.id}, (error, obj) ->
          if !obj
            console.log("Member not found")
            res.send(error, 400)
          else
            console.log("Logging in as " + obj.name)
            req.session.member = obj
            res.redirect('/stream')
        )
      else
        res.redirect('login')
    )
  else
    res.redirect('login')

router.get '/test', (req, res) ->
  res.redirect('/')
  
#=== Login and signup =========
#Login validation
router.get '/login', (req, res) ->
  if req.session.family
    res.render 'users/login', {error: "Already logged in"}
  else
    res.render 'users/login', {}

router.post '/validate', (req, res) ->
  user = req.param "username"
  password = req.param "password"
  Family.findOne({username: user, pword: password}, (error, obj) ->
    if !obj
      res.send(error, 400) 
    else 
      req.session.family = obj
      res.send obj, 200
  )

#Create new account
router.get '/new', (req, res) ->
  console.log "Creating new user"
  res.render 'users/new'

router.post '/create', (req, res) ->
  name = req.param 'name'
  username = req.param 'username'
  password = req.param 'password'

  newUser = new Family(
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

router.get '/logout', (req, res) ->
  req.session.destroy()
  res.redirect('login')

module.exports = router