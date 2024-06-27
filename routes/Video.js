const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authJWT = require('../models/auth.js');
const Video = require('../models/videosdb.js'); // Ensure you have a Video model defined
const User = require('../models/usersdb.js'); // For user-related checks if needed

// Get the list of videos for a specific user
router.get('/api/users/:id/videos', authJWT, async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Fetching videos for user: ${userId}`);
        const videos = await Video.find({ userId });
        res.status(200).json(videos);
    } catch (err) {
        console.log('Error fetching videos:', err);
        res.status(500).send(err);
    }
});

// Create a new video post for a user
router.post('/api/users/:id/videos', authJWT, async (req, res) => {
    try {
        const username = req.params.id;
        const { title, description, url } = req.body;
        console.log(`Creating video for user: ${username}`);

        const newVideo = new Video({
            username: username,
            title,
            description,
            url,
            createdAt: new Date()
        });
        console.log('New video:', newVideo);
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (err) {
        console.log('Error creating video:', err);
        res.status(400).send(err);
    }
});

// Get details of a specific video
router.get('/api/users/:id/videos/:pid', authJWT, async (req, res) => {
    try {
        const { id, pid } = req.params;
        console.log(`Fetching video details: User - ${id}, Video - ${pid}`);
        const video = await Video.findById(pid);
        if (!video || video.userId.toString() !== id) {
            return res.status(404).send('Video not found');
        }
        res.status(200).json(video);
    } catch (err) {
        console.log('Error fetching video details:', err);
        res.status(500).send(err);
    }
});

// Update a video post
router.put('/api/users/:id/videos/:pid', authJWT, async (req, res) => {
    try {
        const { id, pid } = req.params;
        console.log(`Updating video: User - ${id}, Video - ${pid}`);
        const updatedVideo = await Video.findByIdAndUpdate(pid, req.body, { new: true });
        if (!updatedVideo || updatedVideo.userId.toString() !== id) {
            return res.status(404).send('Video not found');
        }
        res.status(200).json(updatedVideo);
    } catch (err) {
        console.log('Error updating video:', err);
        res.status(400).send(err);
    }
});

// Partially update a video post
router.patch('/api/users/:id/videos/:pid', authJWT, async (req, res) => {
    try {
        const { id, pid } = req.params;
        console.log(`Patching video: User - ${id}, Video - ${pid}`);
        const updatedVideo = await Video.findByIdAndUpdate(pid, req.body, { new: true });
        if (!updatedVideo || updatedVideo.userId.toString() !== id) {
            return res.status(404).send('Video not found');
        }
        res.status(200).json(updatedVideo);
    } catch (err) {
        console.log('Error patching video:', err);
        res.status(400).send(err);
    }
});

// Delete a video post
router.delete('/api/users/:id/videos/:pid', authJWT, async (req, res) => {
    try {
        const { id, pid } = req.params;
        console.log(`Deleting video: User - ${id}, Video - ${pid}`);
        const video = await Video.findByIdAndDelete(pid);
        if (!video || video.userId.toString() !== id) {
            return res.status(404).send('Video not found');
        }
        res.status(200).json({ message: 'Video deleted' });
    } catch (err) {
        console.log('Error deleting video:', err);
        res.status(500).send(err);
    }
});

module.exports = router;
