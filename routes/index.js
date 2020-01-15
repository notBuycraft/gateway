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
        Token.create({user: user._id, date: new Date()}, (error, token) => {
            res.status(201).json({token: token._id});
        });
    });

});

router.post('/auth', (req, res) => {
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

router.get('/data', (req, res) => {
    Token.findById(req.body.token, (error, token) => {
    if(token == null) res.status(401).json({error: "invalid token"});
        User.findById(token.user, (error, user) => {
            res.status(200).json(user);
        });
    });
});

module.exports = router;