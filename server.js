const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User.js');
const videoRoutes = require('./routes/Video.js'); // Ensure this matches the exact file name

const app = express();
const hostname = '127.0.0.1'; // Listen on all available network interfaces
const port = 8080;

mongoose.connect('mongodb://localhost:27017/footube', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Ensure this is before other middleware that processes the body
//app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Use the routes
app.use('/', userRoutes);
app.use('/', videoRoutes); // Ensure the video router is used

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
