var product = require('../../models/product.model');
var session = require('../../models/sessionID.model');

module.exports = async function(req, res) {
  // data of mongodb
  var items = await product.find({});
  var page = parseInt(req.query.page) || 1;
  var perPage = 12;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  // lấy số lượng hàng có trong rỏ hàng theo mỗi phiên làm việc sessionId
  var sessionCart = await session.find({
    sessionID: req.signedCookies.sessionId
  });
  var countProductCart = 0;
  for (var value of sessionCart[0].cart) {
    countProductCart += value.count;
  }
  res.json(items);
};
