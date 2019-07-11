var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/session.controller');

router.get('/add/:id', sessionController);

module.exports = router;
