const express = require('express');
const mongoose = require('mongoose');
const User = require("../schemas/user"); 
const Post = require('../schemas/post'); 
const Comment = require('../schemas/comment'); 

const router = express.Router();

router.post('/create', async (req, res) => {
try {
const { name, username, email, password, bio } = req.body;

// Chcking
 const existingUser = await User.findOne({email:email});

        if (existingUser) {
            return res.status(400).json({ 
                error: 'User with this email or username already exists' 
            });
        }
        // Create new user
        const newUser = new User({ name, username, email, password, bio });
        const savedUser = await newUser.save();
        console.log("user is:",savedUser)
        res.status(201).json(savedUser);
    } catch (error) {
   console.log("Error is:"+error);
  
        res.status(500).json({ error: error.message });
    }
});


// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('followers', 'username')
            .populate('following', 'username')
            .populate('posts', 'caption')
            .populate('likedPosts', 'caption')
            .populate('comments');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user",user)
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/update/:id', async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.currentUserId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!userToFollow.followers.includes(currentUser._id)) {
            userToFollow.followers.push(currentUser._id);
            currentUser.following.push(userToFollow._id);
            await userToFollow.save();
            await currentUser.save();
        }

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.currentUserId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (followerId) => !followerId.equals(currentUser._id)
        );
        currentUser.following = currentUser.following.filter(
            (followingId) => !followingId.equals(userToUnfollow._id)
        );

        await userToUnfollow.save();
        await currentUser.save();

        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's posts
router.get('/:id/posts', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('posts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send a comment
router.post('/:postId/comment', async (req, res) => {
    try {
        const { text, userId } = req.body; 
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(userId);
        if (!post || !user) {
            return res.status(404).json({ message: 'Post or User not found' });
        }
        // Create a new comment
        const newComment = new Comment({
            text: text,
            post: post._id,
            createdBy: user._id
        });

        const savedComment = await newComment.save();
        post.comments.push(savedComment._id);
        await post.save();
        user.comments.push(savedComment._id);
        await user.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;

console.log("ROuter is imported sucessfully!@!");