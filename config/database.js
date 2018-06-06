// //connect mongodb
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/wolsuki-backend', {
    useMongoClient: true
});
mongoose.set('debug', true);
var db = mongoose.connection;
// var db;
db.on('error', console.error.bind(console, 'connect database error:'));
db.once('open', function (callback) {
  console.log('database connected.');
});
module.exports = db;

