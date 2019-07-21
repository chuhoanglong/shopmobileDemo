var express = require('express');
var router = express.Router();
var productController = require('../controllers/productcontroller');

router.get('/api/product', productController);
module.exports = router;
