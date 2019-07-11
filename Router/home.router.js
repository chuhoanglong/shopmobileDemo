var express = require('express');
var router = express.Router();
var loginMiddleware = require('../middleware/login.middleware');
var product = require('../models/product.model');
var session = require('../models/sessionID.model');

router.use(express.static('public'));


router.get('/', loginMiddleware.login, async function(req, res) {
  // data of mongodb
  var items = await product.find({});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('trangchu', {
    items: items.slice(start, end),
    count: countProductCart
  });
});

router.get('/Apple',loginMiddleware.login,async function(req, res) {
  // data of mongodb
  var items = await product.find({classify:'Apple'});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('trangchu', {
    items: items.slice(start, end),
    count: countProductCart
  });

});

router.get('/SamSung',loginMiddleware.login,async function(req, res) {
  // data of mongodb
  var items = await product.find({classify:'SamSung'});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('trangchu', {
    items: items.slice(start, end),
    count: countProductCart
  });
});

router.get('/Ipad',loginMiddleware.login,async function(req, res) {
  // data of mongodb
  var items = await product.find({classify:'Ipad'});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('trangchu', {
    items: items.slice(start, end),
    count: countProductCart
  });
});

router.get('/Laptop',loginMiddleware.login,async function(req, res) {
  // data of mongodb
  var items = await product.find({classify:'Laptop'});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('trangchu', {
    items: items.slice(start, end),
    count: countProductCart
  });
});

router.get('/:code', loginMiddleware.login, async function(req, res) {
  // data of mongodb
  var item = await product.find({
    code: req.params.code
  });
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  })
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.render('infoItem', {
    item: item[0],
    count: countProductCart
  });
});



module.exports = router;
