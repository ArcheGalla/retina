const bunyan = require('bunyan');
const nodemailer = require('nodemailer');
const env = require('../../const/constant');
const logger = bunyan.createLogger({ name: 'nodemailer' });
const messageFactory = require('./messeges');
logger.level('trace');

const from = `${env.EMAIL}`;
const transportDefault = { from };
const transportOptions = {
	service: 'Gmail', auth: { user: env.EMAIL, pass: env.EMAIL_PASSWORD },
	//logger, debug: true
};

let transporter = nodemailer.createTransport(transportOptions, transportDefault);

module.exports = {
	sandThemeEmail(file, theme) {
		const message = messageFactory.getSubmitThemeEmailMessage(file, theme);

		return transporter
			.verify()
			.then(() => transporter.sendMail(message))
	},
	sandThemeSuccessfulNotify(lang, email) {
		const message = messageFactory.getThemeSuccessfulNotifyMessage(lang, email);

		return transporter
			.verify()
			.then(()=> transporter.sendMail(message));
	},
	sandSuccessfulPaymentEmail(lang, email) {
		const message = messageFactory.getSuccessfulPaymentEmailMessage(lang, email);

		return transporter
			.verify()
			.then(() => transporter.sendMail(message));
	}
};