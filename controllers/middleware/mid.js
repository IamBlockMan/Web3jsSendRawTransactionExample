var escapeHtml = require('escape-html');
const {
    NODE_ENV,
} = process.env;

module.exports = function(app) {
	var middlewares = {
		globalVariables: function(req, res, next) {
			res.locals.NODE_ENV = NODE_ENV;
			return next();
		},
		isLoggined: function(req, res, next) {
			if (req.isAuthenticated()) {
				return res.send({code: "BAD_REQUEST" });
			} else {
				return next();
			}
		},
		isAuthenticated: function(req, res, next) {
			if (req.isAuthenticated()) {
				return next();
			}
			else {
				var err = new Error('Unauthorized');
				err.status = 404;
				return next(err);
			}
		},
	};
	return middlewares;
};


