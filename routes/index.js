var express = require('express');
var router = express.Router();
var controller_index = require('../controllers/index');

module.exports = function (passport) {

	router.get('/', controller_index.renderAppDashboard);
	
	return router;
};

