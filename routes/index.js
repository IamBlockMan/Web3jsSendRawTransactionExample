var express = require('express');
var router = express.Router();
var controller_index = require('../controllers/index');

router.get('/', controller_index.renderAppDashboard);

module.exports = router;

