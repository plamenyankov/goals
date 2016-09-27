var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Goal = require("../models/goal");
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
    User.findOne({name: "plamen"}, function (err, user) {

        //res.json(user._id);

        Goal.find({postedBy: user._id}, function (error, goals) {

            res.render('goals', {goals: goals});
            //res.json(goals);

        });
    });
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
router.get('/get-goal', function (req, res, next) {
    //var user = new User();
    User.findOne({name: req.body.name}, function (err, user) {

        res.json(req.body);
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
router.get("/addme", function (req, res, next) {
    var user = new User();
    //user._id = 1;
    user.username = "plamen";
    user.email = "pss22lamen@abv.bg";
    user.password = "secret";
    user.save(function (err) {
        if (err) return next();
        res.json(user);

    });
});
router.get("/addme2", function (req, res, next) {
        res.json("hello");

});
router.get("/goals", function (req, res, next) {
    User.findOne({name: "plamen"}, function (err, user) {
        Goal.find({_creator: user._id}, function (err, goals) {
            res.json(goals);
        })
    });

});
router.get("/addgoal", function (req, res, next) {
    var goal = new Goal();
    goal._creator = 1;
    goal.name = "Learn NodeJS";
    goal.save(function (err) {

        if (err) return next();
        res.json(goal);

    });
});
module.exports = router;
