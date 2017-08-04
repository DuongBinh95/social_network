/**
 * Created by duong on 8/1/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title : String,
    content : String,
    image : String,
    user: {
        _id : Schema.Types.ObjectId,
        name : String,
        profile :String
    },
    comments :[{
        _id :Schema.Types.ObjectId,
        content : String,
        user : [{
            _id : Schema.Types.ObjectId,
            name : String,
            profile : String
        }],
        create_at : Schema.Types.Date
    }],
    like : [Schema.Types.ObjectId],
    date_create : Schema.Types.Date
},{collection: "posts"});

module.exports = mongoose.model("Post", postSchema);