var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Goal = require("../models/goal");
var passportConf = require("../config/passport");
/* GET home page. */
//router.get('/exec', function (req, res, next) {
//
//    var plamen = new User();
//    plamen.name = "plamen";
//    plamen.save();
//
//    var goal = new Goal({
//        title: "Hello World",
//        postedBy: plamen._id
//    });
//    goal.save(function(error) {
//        if (!error) {
//            Goal.find({})
//                .populate('postedBy')
//                .exec(function(error, goals) {
//                    res.json(goals)
//                })
//        }
//    });
//
//});

router.get('/', function (req, res, next) {
    //req.session.user = "plamen";
    //        console.log(req.session);
    //        res.render('home',{info:req.flash('info')});
    res.json(req.user);

});
router.post('/goal', function (req, res, next) {
    User.findOne({name: req.param('name')}, function (err, user) {

        var goal = new Goal({
            title: req.param("goal"),
            postedBy: user._id
        });
        goal.save(function (error) {
            if (!error) {
                Goal.find({})
                    .populate('postedBy')
                    .exec(function (error, goals) {
                        res.redirect("/");
                    });
            }
        });
    });
});

router.get('/edit/:id', function (req, res, next) {

    Goal.findOne({_id: req.params.id}, function (err, goal) {
        res.render('goal/edit',{goal:goal});
    });
});
router.post('/edit', function (req, res, next) {

    Goal.findOne({_id: req.param('id')}, function (err, goal) {
        if(err) throw err;

        goal.title = req.param('title');
        goal.save();
        res.redirect('/');
    });
});

router.get("/goals",passportConf.isAuthenticated, function (req, res, next) {
        Goal.find({}, function (err, goals) {
           return res.render('goals', {goals: goals});
        });
});
module.exports = router;
