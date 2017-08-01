/**
 * Created by duong on 7/31/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    gender : String,
    dob : Date,
    img : String,
    address : String,
    workplace : String,
    posts :[Schema.Types.ObjectId]
});

module.exports = mongoose.model('User' , UserSchema);
