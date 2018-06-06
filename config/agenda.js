const Agenda = require('agenda');

let connectionOpts = {
    db: {address: 'mongodb://127.0.0.1/wolsuki-backend', collection: 'scheduleJobs'}
};

let agenda = new Agenda( connectionOpts );

require( '../jobs/apps' )( agenda );

agenda.on('ready', () => {
    agenda.start();
});

module.exports = agenda;