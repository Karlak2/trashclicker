"use strict";

var express = require('express');

var app = express();
app.use(express["static"]('public'));

var fs = require("fs-extra");

var bodyParser = require('body-parser');

var cors = require('cors');

var login = require('./routes/login');

app.use('/login', login);
app.use(cors());
app.use(bodyParser.json());
app.get('/', function _callee(req, res) {
  var ind;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fs.readFile('public/mainpage/index.html', 'utf-8'));

        case 2:
          ind = _context.sent;
          res.send(ind);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log('App started at localhost:3000!');
});