var session = require('../models/sessionID.model');
var shortid = require('shortid');
module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    // add sessionID into data mongodb
    session.create({
      sessionID: sessionId,
      cart: [{
        productID: null,
        count: null
      }]
    });


  }
  next();
}
