var product = require('../models/product.model');
var session = require('../models/sessionID.model');

module.exports = async function(req,res){
  var sessionId = req.signedCookies.sessionId;
  var sessions = await session.find({sessionID: sessionId});
  var carts = sessions[0].cart;
  var arrTemp = [];
  var sumPrice = 0;
  for (var cart of carts) {
    if(cart.productID){
      var temp = await product.find({_id: cart.productID});
      temp[0].count = carts.find(function(element){
        return element.productID === cart.productID;
      }).count;
      arrTemp.push(
        temp[0]
      );
    }
  }
  for (var arr of arrTemp) {
    sumPrice += arr.price_item * arr.count;
  }
  res.render('cart',{carts:arrTemp,sumPrice:sumPrice});
}
