var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
});
var productSchema = new mongoose.Schema({
  code: String,
  name_item: String,
  classify: String,
  price_item: Number,
  note: String,
  image: String
});

var Product = mongoose.model('items', productSchema);
module.exports = Product;
