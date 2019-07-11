// require npm system
var express = require('express');
var app = express();
var port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.listen(port, () => {
  console.log('start server on port: ' + port);
});

// require npm more
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
var multer = require('multer'); // ues multer for upload file
var upload = multer({
  dest: './public/uploads/'
});
var shortid = require('shortid');

// require cookieParser
var cookieParser = require('cookie-parser');
app.use(cookieParser('1chuoingaunhien'));

// require mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
});


// data of dblow
var db = require('./db/lowdb');

// require component controller
var loginController = require('./controllers/login.controller');
var uploadController = require('./controllers/upload.controller')

// require component Middleware And router
var sessionId = require('./middleware/session.middleware');
app.use(sessionId);
var homeRouter = require('./Router/home.router');
app.use('/Home', homeRouter);
var loginMiddleware = require('./middleware/login.middleware');
var cartRouter = require('./Router/cart.router');
app.use('/', cartRouter);
var cartMiddleware = require('./middleware/cart.middleware');

var routerProduct = require('./api/router/router.product');
app.use('/',routerProduct);

// Router process login
app.post('/login', loginController.loginController);
app.get('/login', function(req, res) {
  res.render('login', {});
});

// router process for upload data
app.get('/upload', function(req, res) {
  res.render('upload', {});
});
/**
để có thể upload file cần thêm 1 middleware
 - upload.single('photo') or
 - upload.array('photo', number file)
 vào trước router post xử lý form /upload.
 TRong form phải có enctype="multipart/form-data" để hiểu dữ liệu đầu vào.
 Trong <input type="file" name="avatar" /> name phải trùng với name trong:
 - upload.single('avatar') or
 - upload.array('avatar', number file)
**/
//var cpUpload = upload.fields([{name: 'avatar',maxCount: 1},{name:'gallery',maxCount:3}])
// router give product in cart
app.post('/upload',
  upload.single('photos'),
  uploadController
);
// router thông tin giỏ hàng.
app.get('/cart',cartMiddleware);
// router Thanh Toan
app.get('/paybuy',function(req,res){
  res.render('payBuy',{});
})
