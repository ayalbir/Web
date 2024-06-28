const express = require('express');
const router = express.Router();
const authJWT = require('../models/auth.js');
const Comment = require('../models/commentsdb.js'); // Ensure you have a Comment model defined
const Video = require('../models/videosdb.js'); // For user-related checks if needed
const { find, findOneAndDelete } = require('../models/usersdb.js');

// Get all comments for a specific video
/*router.get('/api/videos/:pid/comments', authJWT, async (req, res) => {
    try {
        const { pid } = req.params;
        console.log(`Fetching comments for video: ${pid}`);
        const comments = await Comment.find({ videoId: pid });
        res.status(200).json(comments);
    } catch (err) {
        console.log('Error fetching comments:', err);
        res.status(500).send(err);
    }
});*/

// Create a new comment for a specific video
router.post('/api/videos/:pid/comments', authJWT, async (req, res) => {
    try {
        const { pid } = req.params;
        const { username, comment } = req.body;
        console.log(`Creating comment for video: ${pid} by user: ${username}`);

        const newComment = new Comment({
            videoId: pid,
            username: username,
            comment: comment,
            createdAt: new Date()
        });

        console.log('New comment:', newComment);
        await newComment.save();
        await Video.findOneAndUpdate({ _id: pid }, { $push: { comments: newComment._id } });
        console.log('Comment added to video');
        res.status(201).json(newComment);
    } catch (err) {
        console.log('Error creating comment:', err);
        res.status(400).send(err);
    }
});

// Get details of a specific comment
router.get('/api/comments/:cid', authJWT, async (req, res) => {
    try {
        const {  cid } = req.params;
        console.log(`Fetching comment details:  Comment - ${cid}`);
        const comment = await Comment.findOne({  _id: cid });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(comment);
    } catch (err) {
        console.log('Error fetching comment details:', err);
        res.status(500).send(err);
    }
});

// Update a comment
router.put('/api/comments/:cid', authJWT, async (req, res) => {
    try {
        const { cid } = req.params;
        console.log(`Updating comment:  Comment - ${cid}`);
        const updatedComment = await Comment.findOneAndUpdate({  _id: cid }, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        console.log('Error updating comment:', err);
        res.status(400).send(err);
    }
});

// Partially update a comment
router.patch('/api/comments/:cid', authJWT, async (req, res) => {
    try {
        const { cid } = req.params;
        console.log(`Patching comment: Video - Comment - ${cid}`);
        const updatedComment = await Comment.findOneAndUpdate({  _id: cid }, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        console.log('Error patching comment:', err);
        res.status(400).send(err);
    }
});

// Delete a comment
router.delete('/api/videos/:pid/comments/:cid', authJWT, async (req, res) => {
    try {
        const { pid, cid } = req.params;
        console.log(`Deleting comment: Video - ${pid}, Comment - ${cid}`);
        const comment = await Comment.findOneAndDelete({ videoId: pid, _id: cid });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json({ message: 'Comment deleted' });
        await Video.findOneAndUpdate({ _id: pid }, { $pull: { comments: cid } });
    } catch (err) {
        console.log('Error deleting comment:', err);
        res.status(500).send(err);
    }
});

module.exports = router;
