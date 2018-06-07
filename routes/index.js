var express = require('express');
var router = express.Router();
var controller_index = require('../controllers/index');

router.get('/', controller_index.renderAppDashboard);
router.get('/contract', controller_index.renderContract);

module.exports = router;

