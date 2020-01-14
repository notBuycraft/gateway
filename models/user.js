const config = require("../config.json");
let crypto = require('crypto');
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// Define schema for `user` database collection
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    display_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: String,
    picture: String,
    date: String
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);

module.exports = User;
