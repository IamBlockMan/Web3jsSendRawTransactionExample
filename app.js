require('isomorphic-fetch');
require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./utils/logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const {
    NODE_ENV,
} = process.env;

const app = express();

const socketArray = {};
app.set('socketArray', socketArray);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);
// app.use(require('morgan')('combined', {"stream": logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({cookie: {}, secret: 'InspiusShopify12', resave: true, saveUninitialized: true})); //session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
app.use(cookieParser('InspiusShopify12'));

let staticOption = {};
if(NODE_ENV === 'production') {
	staticOption = {maxAge: '1d'};
}
else {
	staticOption = {maxAge: 0};
}
app.use(express.static('webs', staticOption));
app.use(express.static('styleguide'));
app.use(express.static('media'));
//set req to local to use in ejs
const mid = require('./controllers/middleware/mid')(app);
app.use(mid.globalVariables);

app.locals.pagingHelper = require('./commons/paging-helper');

const indexRoute = require('./routes/index');
app.use('/', indexRoute(passport));



// catch 404 and forward to error handler

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	return res.redirect('/login');
});


module.exports = app;