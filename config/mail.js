var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mailSetting = require('../config/config-mail');
var mail = nodemailer.createTransport(smtpTransport({
	host: 'smtp.mailgun.org',
	port: 465,
	auth: {
		user: mailSetting.emailSender,
		pass: mailSetting.passEmail
	}
}));

module.exports = mail;