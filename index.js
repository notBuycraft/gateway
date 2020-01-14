const config = require("./env/config.json");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Connect to MongoDB
mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
mongoose.set('useCreateIndex', true);

// Handle mongo errors
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB with no errors.');
});



// Use sessions for tracking login
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// Include routes
var routes = require('./routes/');
app.use('/', routes);

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


// Listen on port {port} <- config
app.listen(config.port, function () {
    console.log('Express server started. Listing on port ' + config.port + '.');
});
