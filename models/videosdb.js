const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    username: { type: String, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
