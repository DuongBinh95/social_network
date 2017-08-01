var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Create new User */
router.post('/new', function (req , res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;
    user.dob = req.body.dob;
    user.img = req.files.img;
    user.address = req.body.address;
    user.workplace = req.body.workplace;
    user.posts = [];

    user.save(function (err) {
        if(err){
          res.render('error', { message:"Error creating user" , error:{status:500}});
        }else {
          res.redirect('/');
        }
    })
})
/*Show delete user form*/
router.get('/delete/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
        if(user){
            res.render('delete', {user: user});
        } else {
            res.render('error', {message: "User not found", error: {status: 404}});
        }
    });
});
/* Delete a user */
router.post('/delete/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(user) {
            user.remove(function(err2){
                if(err2) {
                    res.render('error', {message: "Error deleting user", error: {status: 500}});
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.render('error', {message: "User not found", error: {status: 404}});
        }
    });
});
/* Show edit user form */
router.get('/edit/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(user){
            res.render('edit', {contact: user});
        } else {
            res.render('error', {message: "User not found", error: {status: 404}});
        }
    });
});

/* Update new User */
router.post('/edit/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(contact){
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.gender = req.body.gender;
            user.dob = req.body.dob;
            user.img = req.files.img;
            user.address = req.body.address;
            user.workplace = req.body.workplace;
            user.save(function(err){
                if(err){
                    res.render('error', {message: "Error updating user", error: {status: 500}});
                } else {
                    res.redirect('/');
                }
            });

        } else {
            res.render('error', {message: "User not found", error: {status: 404}});
        }
    });
});
module.exports = router;
