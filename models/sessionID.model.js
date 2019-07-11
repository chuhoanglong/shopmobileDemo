var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
});
var sessionSchema = new mongoose.Schema({
  sessionID: String,
  cart: [{
    productID: String,
    count: {
      type: Number,
      Min: 0
    }
  }]
})

var SessionID = mongoose.model('sessions', sessionSchema);

module.exports = SessionID;
