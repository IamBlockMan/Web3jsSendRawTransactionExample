const logger			= require( './../utils/logger' );
const response_code		= require( './../models/response-code' );
const moment            = require('moment');
const {
    NODE_ENV,
} = process.env;

const controller_index = {
    renderAppDashboard: function ( req, res ) {
        return res.redirect('/fixtures');
    },
};

module.exports = controller_index;