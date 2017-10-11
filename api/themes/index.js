const express = require('express');
const router = express.Router();
const validate = require('express-jsonschema').validate;

const positionEnum = ['professor', 'doctor', 'docent', 'assistant', 'професор', 'доктор', 'доцент', 'асистент'];
const placeEnum = ['clinic', 'university', 'клініка', 'університет'];

const ThemeSchemas = {
	type: 'object',
	properties: {
		name: { type: 'string', required: true },
		surname: { type: 'string', required: true },
		country: { type: 'string', required: true },
		email: { type: 'email', required: true },
		theseName: { type: 'string', required: true },
		description: { type: 'string', required: true },
		city: { type: 'string', required: true },
		position: { type: 'string', required: true, enum: positionEnum },
		place: { type: 'string', required: true, enum: placeEnum },
		phone: { type: 'string', required: true }
	}
};

function normalize(field) {
	return field.trim().lowerCase();
}

router.post('/themes', validate({ body: ThemeSchemas }), function (req, res) {
	const [email, name, surname, theseName] = req.body;

	const nEmail = normalize(email);
	const nName = normalize(name);
	const nSurname = normalize(surname);
	const nTheseName = normalize(theseName);

	


	res.status(200).json({ 'message': 'Created' });
});

module.exports = router;