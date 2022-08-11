"use strict";

var express = require('express');

var app = express();

var mongoose = require("mongoose");

var cors = require('cors');

var cookieParser = require("cookie-parser");

app.use(express["static"]('public'));
app.use(cookieParser()); // app.use(express.urlencoded({ extended: true }));

var fs = require("fs-extra");

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var login = require('./routes/login');

var register = require('./routes/register');

var users = require('./routes/users');

app.use('/login', login);
app.use('/register', register);
app.use('/users', users);
app.get('/', function (req, res) {
  console.log('Clicked');
  res.send({
    word: 'Hi'
  });
});
mongoose.connect("mongodb://localhost/trashclicker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  console.log("CONNECTED DB");
});
var db = mongoose.connection;
db.on('error', function (error) {
  return console.error(error);
});
db.once('open', function () {
  return console.log("Connected to database");
});
app.listen(8080, function () {
  console.log('App started at localhost:8080!');
});