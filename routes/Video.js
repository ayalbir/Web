const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authJWT = require('../models/auth.js');
const Video = require('../models/videosdb.js'); // Ensure you have a Video model defined
const User = require('../models/usersdb.js'); // For user-related checks if needed

router.patch('/api/users/:id/videos/:pid/likes', authJWT, async (req, res) => {
    try {
        const username = req.params.id;
        const videoId = req.params.pid;
        console.log(`Liking video: User - ${username}, Video - ${videoId}`);
        const video = await Video.findOne({ _id: videoId });
        if (!video) {
            return res.status(404).send('Video not found');
        }
        if (video.likedBy.includes(username)) {
            video.likedBy = video.likedBy.filter(user => user !== username);
            console.log(`liking video canceled: User - ${username}, Video - ${videoId}`);
        }
        else {
            if (video.dislikedBy.includes(username)) {
                video.dislikedBy = video.dislikedBy.filter(user => user !== username);
                console.log(`disliking video canceled: User - ${username}, Video - ${videoId}`);
            }
            video.likedBy.push(username);
            console.log(`Liking video: User - ${username}, Video - ${videoId}`);
        }
        video.dislikes = video.dislikedBy.length;
        video.likes = video.likedBy.length;
        await video.save();
        res.status(200).json(video);
    } catch (err) {
        console.log('Error liking video:', err);
        res.status(400)
    }
});
        //const video = await Video.findOne({username: id, title: pid});

router.patch('/api/users/:id/videos/:pid/dislikes', authJWT, async (req, res) => {
    try {
        const username = req.params.id;
        const videoId = req.params.pid;
        console.log(`disliking video: User - ${username}, Video - ${videoId}`);
        const video = await Video.findOne({ _id: videoId });
        if (!video) {
            return res.status(404).send('Video not found');
        }
        if (video.dislikedBy.includes(username)) {
            video.dislikedBy = video.dislikedBy.filter(user => user !== username);
            console.log(`disliking video canceled: User - ${username}, Video - ${videoId}`);
        }
        else {
            if (video.likedBy.includes(username)) {
                video.likedBy = video.likedBy.filter(user => user !== username);
                console.log(`liking video canceled: User - ${username}, Video - ${videoId}`);
            }
            video.dislikedBy.push(username);
            console.log(`disliking video: User - ${username}, Video - ${videoId}`);
        }
        video.likes = video.likedBy.length;
        video.dislikes = video.dislikedBy.length;
        await video.save();
        res.status(200).json(video);
    } catch (err) {
        console.log('Error disliking video:', err);
        res.status(400)
    }
});


// Get the list of videos for a specific user
router.get('/api/users/:id/videos', authJWT, async (req, res) => {
    try {
        const username = req.params.id;
        console.log(`Fetching videos for user: ${username}`);
        const videos = await Video.find({ username: username}.populate('comments'));
        res.status(200).json(videos);
    } catch (err) {
        console.log('Error fetching videos:', err);
        res.status(500).send(err);
    }
});

// Get the list of 20 videos top 10 most viewed videos and random 10 videos
router.get('/api/videos', authJWT, async (req, res) => {
    try {
        console.log(`Fetching 20 videos top 10 most viewed videos and random 10 videos`);
        const topw10ViewedVideos = await Video.find().sort({views: -1}).limit(10);
        const randomVideos = await Video.aggregate([{$sample: {size: 10}}]);  // Random 10 videos;
         //Merge the two arrays
        const combinedVideos = topw10ViewedVideos.concat(randomVideos);
        // sort randomly
        const shuffleVideos = combinedVideos.sort(() => Math.random() - 0.5);
        
        res.status(200).json(shuffleVideos);
    } catch (err) {
        console.log('Error fetching videos:', err);
        res.status(500).send(err);
    }
});

// Create a new video post for a user
router.post('/api/users/:id/videos', authJWT, async (req, res) => {
    try {
        const username = req.params.id;
        const { title, description, url,views } = req.body;
        console.log(`Creating video for user: ${username}`);

        const newVideo = new Video({
            username: username,
            title,
            description,
            url,
            createdAt: new Date(),
            views: views || 0

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
        const video = await Video.findOne({username: id, _id: pid}).populate('comments');
        if (!video || video.username!== id) {
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
        const updatedVideo = await Video.findOneAndUpdate({username: id, _id: pid}, req.body, { new: true });
        if (!updatedVideo || updatedVideo.username !== id) {
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
        const updatedVideo = await Video.findOneAndUpdate({username: id, _id: pid}, req.body, { new: true });
        if (!updatedVideo || updatedVideo.username !== id) {
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
        const video = await Video.findOneAndDelete({username: id, _id: pid});
        if (!video || video.username !== id) {
            return res.status(404).send('Video not found');
        }
        res.status(200).json({ message: 'Video deleted' });
    } catch (err) {
        console.log('Error deleting video:', err);
        res.status(500).send(err);
    }
});

module.exports = router;
