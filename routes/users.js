/**
 * Created by duong on 8/2/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var User = require('../app/models/user');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage : storage});

/* GET home page. Listing users */
router.get('/', function(req, res) {
    User.find({}, function (err, users) {
        res.json({ posts: users });
    });
});

/* view a single users */
router.get('/users/:id' , function (req , res) {
    User.findById(res.params.id , function (err , user) {
        if (err){
            res.json({message : 'User was not found ' , error : err});
        }else {
            res.json({post : user});
        }
    });
});

/* Create new user*/
router.post('/', upload.single('img') ,  function (req , res) {
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        gender : req.body.gender,
        dob : req.body.dob,
        img : req.file.originalname,
        address : req.body.address,
        workplace :req.body.workplace,
        posts :[]
    },function (err) {
        if(!err){
            res.json({message:'User create successfully !'});
        }else {
            res.json({message: 'Error creting user!'});
        }
    });
});
/* Delete a user */
router.delete("/delete/:id", function (req , res) {
    User.findById(req.params.id , function (err , user) {
        if (err){
            res.json({message:"User was not found" , error: error});
        }else {
            fs.unlink('public/upload' + user.img ,function (err3) {
            });
            user.remove(function (err2) {
                if(err2){
                    res.json({message : "Error deleting user" , error: error});
                }else {
                    res.json({message: "Success"});
                };
            });
        }
    });
});
/* Update a user*/
router.put("/edit/:id", upload.single('img'),function (req , res) {
    User.findById(req.params.id , function (err , user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.gender = req.body.gender;
        user.dob = req.body.dob;
        if (req.file){
            user.img = req.file.originalname;
        }
        user.address = req.body.address;
        user.workplace = req.body.workplace;

        user.save(function (err) {
            res.json({post : user});
        })
    });
});



module.exports = router;