var product = require('../models/product.model');
module.exports = function(req, res) {
  var photoPath = req.file.path.split("\\").slice(1).join("\\");
  var name_item = req.body.name_item;
  var classify = req.body.classify;
  var price_item = req.body.price_item.paserInt;
  var note = req.body.note;
  var code = req.body.id;
  product.create({
    code: code,
    name_item: name_item,
    classify: classify,
    price_item: price_item,
    note: note,
    image: photoPath
  });
  res.render('upload', {});
};
