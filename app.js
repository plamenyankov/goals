var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var db = require("./config");
var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user');
var engine = require("ejs-mate");
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var MongoStore = require('connect-mongo')(session);
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//passport.use(new LocalStrategy(
//    function(username, password, done) {
//      User.findOne({ name: username }, function (err, user) {
//        if (err) { return done(err); }
//        if (!user) {
//          return done(null, false, { message: 'Incorrect username.' });
//        }
//        if (!user.validPassword(password)) {
//          return done(null, false, { message: 'Incorrect password.' });
//        }
//        return done(null, user);
//      });
//    }
//));
//var user = require('./models/user');
var app = express();
mongoose.connect(db.getDbConnectionConfig());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", engine);
app.set("view engine", 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'plamen',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
