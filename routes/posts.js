/**
 * Created by duong on 8/3/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var Post = require('../app/models/post');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage : storage});

/* GET home page. Listing posts */
router.get('/', function(req, res) {
    Post.find({}, function (err, posts) {
        res.json({ posts: posts });
    });
});

/* view a single posts */
router.get('/posts/:id' , function (req , res) {
    Post.findById(res.params.id , function (err , post) {
        if (err){
            res.json({message : 'Post was not found ' , error : err});
        }else {
            res.json({post : post});
        }
    });
});

/* Create new post*/
router.post('/',  upload.single('image') , function (req , res) {
    var post = new Post({
        content : req.body.content,
        image : req.file.originalname,
        user : {
            _id : "5982d35673658c359b926107",
            name : "Duong",
            profile : "1.png",
        },
        comments :[],
        likes : [],
        date_create :Date.now()

    });
    post.save(function (err) {
        if(!err){
            res.json({post : post});
        }else {
            res.json({message: 'Error creting post!'});
        }
    });
});


module.exports = router;