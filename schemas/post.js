const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: { type: String },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
console.log("post schema imported!")