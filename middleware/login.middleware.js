var db = require('../db/lowdb');
var dbusers = require('../models/user.model')

module.exports.login = function(req, res, next) {
  if (!req.signedCookies.cookie) {
    res.redirect('/login');
    return;
  }
  console.log('cookie:  ' + req.signedCookies.cookie);


  // tranh truong hap nguoi dung nhap cookie giai mao
  //var user = db.get('users').find({id:req.signedCookies.cookie}).value();
  dbusers.find({
    _id: req.signedCookies.cookie
  }).then(function(user) {

    if (!user) {
      res.redirect('/login');
      return;
    }
    res.locals.user = user[0];
    console.log(req.signedCookies.cookie);
    next();
  });

};
