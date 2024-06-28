const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    { 
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        privateName: { type: String, required: true },
        familyName: { type: String, required: false },
        birthdate: { type: Date, required: true },
        gender: { type: String, required: true },
        image: { type: String, required: true },
    });
const User = mongoose.model('users', userSchema);
module.exports = User;
