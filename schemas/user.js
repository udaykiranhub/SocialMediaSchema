const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
type:String,
required:true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
     
},
    password: {
        type: String,
        required: true,
        minlength: 6
},
  
    bio: {
        type: String,
        maxlength: 160
    },
    
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

console.log("User schema imported!");
