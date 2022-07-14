"use strict";

var express = require('express');

var fs = require('fs-extra');

var router = express.Router();
router.get('/', function _callee(req, res) {
  var ind;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fs.readFile('../trashclicker/public/login/login.html', 'utf-8'));

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
module.exports = router;