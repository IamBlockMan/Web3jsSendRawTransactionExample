var winston = require('winston');
winston.emitErrs = true;

const {
    NODE_ENV,
} = process.env;

var loggerWinston = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: false,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});

var logger = {
    log: function(data) {
        if(NODE_ENV !== "production") {
            console.log(data);
        }
        else {
            loggerWinston.info(data);
        }
    }
};

module.exports = logger;