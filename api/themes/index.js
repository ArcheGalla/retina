const express = require('express');
const router = express.Router();
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });
const fileEngine = require('../services/file-storage');
const positionEnum = ['professor', 'doctor', 'docent', 'assistant', 'професор', 'доктор', 'доцент', 'асистент'];
const placeEnum = ['clinic', 'university', 'клініка', 'університет'];

const ThemeSchemas = {
	type: 'object',
	required: ['name', 'surname', 'country', 'email', 'topic', 'description', 'city', 'position', 'place', 'phone'],
	properties: {
		name: { type: 'string' },
		surname: { type: 'string' },
		country: { type: 'string' },
		email: { type: 'string' },
		topic: { type: 'string' },
		description: { type: 'string' },
		city: { type: 'string' },
		position: { type: 'string', enum: positionEnum },
		place: { type: 'string', enum: placeEnum },
		phone: { type: 'string' }
	}
};

function normalize(field) {
	return field.trim().toLowerCase();
}

router.post('/', validator.validate({ body: ThemeSchemas }), function (req, res) {
	const { body } = req;

	ThemeSchemas.required.forEach(field => body[field] = normalize(body[field]));

	fileEngine
		.createFile(body)
		.then(() => res.status(200).json({ 'message': 'Created' }))
		.catch((err) => res.status(500).json({ "message": err }));
});

module.exports = router;