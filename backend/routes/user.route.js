// importing modules 
const router = require('express').Router();
const passport = require("passport");

//import user model
const User = require('../models/user.model');

router.post('/register', function (req, res) {
    const newUser = new User({ username: req.body.username });
    console.log(newUser);

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            res.status(401).json({
                "success": "false", "message": err.message
            })
        } else {
            passport.authenticate("local")(req, res, () => {
                res.json({
                    "success": "true",
                    "message": "Your account has been registered",
                    "user": req.user,
                    "session": req.session
                })
            });

        }
    });
});

router.post('/login', function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            res.status(401).json({
                "success": "false", "message": err.message
            })
        } else {
            passport.authenticate("local", { failureFlash: true })(req, res, function () {
                res.json({
                    "success": "true",
                    "message": "Loginned successfully",
                    "user": req.user,
                    "session": req.session
                })
            });
        }
    });
});

module.exports = router;