const User = require('../models/usersdb');
const express = require('express');
const router = express.Router();
const registerUser = async (req, res) => {
    const { username, password,privateName, familyName, birth, gender, image } = req.body;
    const isUser = await User.findOne({ username });
    if (isUser) {
        return res.status(400).send('User already exists');
    }
    
    try {
        const user = await User.create({username, password,privateName,familyName, birth, gender, image}); 
        if (user) {
            return res.status(201).send('User not created');
        }
        else {
            return res.status(400).send('User not created');
        }
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send (err);
    }
    console.log('POST /users');
    res.render('foo');
}