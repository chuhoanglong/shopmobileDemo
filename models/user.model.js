var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
});

var User = mongoose.model('users', userSchema);

module.exports = User;
