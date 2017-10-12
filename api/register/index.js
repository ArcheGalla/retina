const { Validator } = require('express-json-validator-middleware');
const mailer = require('../services/mailer');
const express = require('express');
const router = express.Router();
const validator = new Validator({ allErrors: true });

const RegisterSchemas = {
	type: 'object',
	required: ['name', 'surname', 'phone', 'city', 'email', 'message', 'intern'],
	properties: {
		name: { type: 'string' },
		surname: { type: 'string' },
		phone: { type: 'string' },
		city: { type: 'string' },
		email: { type: 'string' },
		message: { type: 'string' },
		intern: { type: 'boolean' }
	}
};

router.get('/register', validator.validate({ body: RegisterSchemas }), function (req, res) {
	const { body } = req;

	mailer
		.sendEmail(body)
		.then(() => {
			res.status(200).json({ 'message': 'Registered' });
		})
		.catch(() => {
			res.status(400).json({ 'message': 'Failed to register' });
		});
});

module.exports = router;