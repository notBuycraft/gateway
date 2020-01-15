let mongoose = require('mongoose');

let TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: String
});

let Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
