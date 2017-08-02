var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var Post = require('../app/models/post')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({

})
module.exports = router;
