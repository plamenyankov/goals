var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require('passport');
var passportConf = require("../config/passport");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/signup', function (req, res, next) {
    res.render('Auth/signup');
});
router.post('/signup', function (req, res, next) {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            res.send(400, 'Bad Request');
        }
        res.redirect("/");
    });
});
router.get('/login', function (req, res, next) {

    res.render('Auth/login');

});
router.get('/logout', function (req, res, next) {
        req.logOut();
    res.render('Auth/login');

});
router.post('/login',passport.authenticate('local', { successRedirect: '/goals',
    failureRedirect: '/user/login',
    failureFlash: true }), function (req, res, next) {

    req.flash("info","User has logged successfully");
    res.redirect('/goals');

});

module.exports = router;
