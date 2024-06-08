const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
},{
    timestamps:true
});

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;