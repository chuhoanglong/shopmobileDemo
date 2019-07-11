var db = require('../db/lowdb');
var dbusers = require('../models/user.model')
module.exports.loginController = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user;
  //  console.log('email: ' + email + 'password: ' + password);
  dbusers.find({
    email: email
  }).then(function(usera) {
    user = usera;
    console.log(user[0].id);
    if (!user[0].email) {
      res.render('login', {
        errors: ['email is not exites']
      });

      return;
    }

    if (password !== user[0].password) {
      res.render('login', {
        errors: ['password is not exites']
      });
      return;
    }
    res.cookie('cookie', user[0].id, {
      signed: true
    });
    res.redirect("/Home");
  });
  //console.log();
  if (!email) {
    res.render('login', {
      errors: ['email is not exites']
    });

    return;
  }
  if (!password) {

    res.render('login', {
      errors: ['password is not exites']
    });
    return;
  }

  // use data in dblow
  /*
  if (!db.get('users').find({
      email: email
    }).value()) {
    res.render('login',{errors:['email is not exites']});

    return;
  }

  if (password !== db.get('users').find({
      email: email
    }).value().password) {
    res.render('login',{errors:['password is not exites']});
    return;

    res.cookie('cookie',db.get('users').find({
        email: email
      }).value().id,{
        signed: true
      });
  }
  */

  // use data in mongodb

};
