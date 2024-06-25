const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authJWT = require('../models/auth.js');
const User = require('../models/usersdb.js');
router.post('/api/users', async (req, res) => {
    try {
        
        const{username, password,privateName, familyName, birthdate, gender, image} = req.body;
        console.log(req.body);
        const user = new User({username, password,privateName, familyName, birthdate, gender, image}); 
        console.log(user);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.log('err:' + err);
        res.status(400).send(err);
    }
    console.log('POST /users');
    res.json( User);
});
router.post('/api/tokens', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password});
        if (!user) {
            console.log('Invalid credentials');
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
        res.json({ 'token': token });
        console.log("token:" + token);
    } catch (err) {
        console.log('err:' + err);
        res .status(400).send(err);
    }
    console.log('POST /users/login');

});



router.get('/api/users/:id', authJWT, async (req, res) => {
    try {
        console.log("req param:"+ req.params.id);
        const user = await User.findOne({ username: req.params.id});
        console.log("user:"+ user);
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
    console.log('GET /api/users/:id');
});
router.put('/api/users/:id', authJWT, async (req, res) => {
    try {
        console.log("req param:"+ req.params);
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("user:"+ user);
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        console.log('err:' + err);
        res.status(400).send(err);
    }
    console.log('PUT /api/users/:id');
});
router.patch('/api/users/:id', authJWT, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
    console.log('PATCH /api/users/:id');
    
});
router.delete('/api/users/:id', authJWT, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        res.status(500)
    }
    console.log('DELETE /api/users/:id');
    
});



module.exports = router;