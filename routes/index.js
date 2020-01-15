var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Token = require('../models/token');
let bcrypt = require('bcrypt');
var router = express.Router();

router.post('/register', (req, res) => {

    let userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: new Date()
    };

    User.create(userData, (error, user) => {
    if(error)
        res.status(406).json({error: "Unique indexes not used..."});
    else
        res.status(201).json(user);
    });

});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
         if (user == null) return res.status(401).json({error: "user not found"});
         bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if(isMatch)
                Token.create({user: user._id, date: new Date()}, (error, token) => {
                    res.status(202).json({token: token._id});
                });
            else
                res.status(401).json({error: "incorrect password"});
        });
    });
});

module.exports = router;