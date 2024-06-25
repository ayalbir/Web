const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const fooRoutes = require('./routes/foo.js');

const app = express();
const hostname = '127.0.0.1'; // Listen on all available network interfaces
const port = 8080;
mongoose.connect('mongodb://localhost:27017/footube', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

// Use the login routes
app.use('/', fooRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
