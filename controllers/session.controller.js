var db = require('../db/lowdb');
var session = require('../models/sessionID.model');
module.exports = async function(req, res, next) {
  var productId = req.params.id;
  var sessionId = req.signedCookies.sessionId;
  var quantity = parseInt(req.query.quantity);// lay ra so luong san pham
  if (!sessionId) {
    res.redirect('/Home');
    return;
  }

  // them product vao cart
  // lấy ra 1 session có sessionID trùng với sessionId của phiên người dùng làm việc.
  var sessionCart = await session.find({
    sessionID: sessionId
  });
  // lấy ra 1 session có mã sản phẩm là mã sản phẩm mà người dùng chọn mua.
  var sessionProduct = await session.find({
    sessionID: sessionId,
    productID: productId
  });
  // nếu không có thì thực hiện thêm mã sản phẩm và số lượng.

  // tim trong cart xem đã có mã sản phẩm đó trong rỏ chưa
  var value = sessionCart[0].cart.find(function(element) {
    return element.productID === productId;
  });
  console.log(value);
  // nếu có thì tăng số lượng sản phẩm chọn lên 1.
  if (value) {
    value.count += quantity;
    sessionCart[0].save(() => {
      console.log("ADD DONE");
    });
  }
  // nếu không có thực hiện thêm sản phẩm mới vào rỏ.
  else {
    sessionCart[0].cart.push({
      productID: productId,
      count: quantity
    });
    sessionCart[0].save(() => {
      console.log("PUSH DONE");
    });
  }
  res.redirect('/Home');
}
