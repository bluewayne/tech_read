
require('babel-register');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http=require('http');
var session = require('express-session');


var configuration=require('../configuration');

var routes = require('./routes/index');
var users = require('./routes/users');
var articles=require('./routes/articles');

var app = express();
var server=http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(session({
  secret: 'bruce', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 300 * 1000 },
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db=require('./access/db');
db();


//app.use('/', routes);
app.use('/users', users);
app.use('/articles',articles);

//
//app.get('/', function (req, res) {
//  if (req.session.isVisit) {
//    req.session.isVisit++;
//    res.send('<p>访问量:' + req.session.isVisit + '</p>');
//  } else {
//    req.session.isVisit = 1;
//    res.send('欢迎初次光临');
//  }
//});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(configuration.api.port, function (err) {

  if(err){
    console.error('api server got error!'+err);
  }

  console.info(`api server run on ${configuration.api.host}:${configuration.api.port}`);

})



