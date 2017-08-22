var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
require("./config/passport")(passport);
//mongoose.connect('mongodb://localhost:27017/pin',{useMongoClient:true});
mongoose.connect("mongodb://pindata1:pindata1@ds023523.mlab.com:23523/pindata",{useMongoClient:true});
var app = express();
//for sessions
app.use(session({
    secret: 'secret1234',
    saveUninitialized: true,
    resave: false
}));
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport initialize
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.user ;
  next();
});
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
require('./routes/index')(app,passport);
 require('./routes/users');
 //app.listen("3000");

module.exports = app;
