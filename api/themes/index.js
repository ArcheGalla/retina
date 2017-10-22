//const positionEnum = ['professor', 'doctor', 'docent', 'assistant', 'професор', 'доктор', 'доцент', 'асистент'];
//const placeEnum = ['clinic', 'university', 'клініка', 'університет'];
const { Validator } = require('express-json-validator-middleware');
const envVariables = require('../../api/const/constant');
const validator = new Validator({ allErrors: true });
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmailService = require('../services/mailer');
const STATUS_CODES = require('http').STATUS_CODES;
const dest = path.resolve(envVariables.THEME_STORAGE);
const upload = multer({ dest });

//city    :    "orativ"
//country    :    "Ukraine"
//email	:	"artempushkar@gmail.com"
//name	:	"arche galla"
//phone	:	"734183185"
//place	:	"clinic"
//position	:	"doctor"
//surname	:	"galla"
//theme	:	"C:\fakepath\theme.txt"
//topic	:	"asdasd"
const ThemeSchemas = {
	type: 'object',
	required: ['name', 'surname', 'country', 'email', 'topic', 'city', 'position', 'place', 'phone'],
	properties: {
		name: { type: 'string' },
		surname: { type: 'string' },
		country: { type: 'string' },
		email: { type: 'string' },
		topic: { type: 'string' },
		city: { type: 'string' },
		position: { type: 'string' },
		place: { type: 'string' },
		phone: { type: 'string' },
		//theme: { }
	}
};

function normalize(field) {
	return field.trim().toLowerCase();
}

function validateMiddleware(req, res, next) {
	next();
}

//router.post('/', upload.single('theme'), validator.validate({ body: ThemeSchemas }), function (req, res) {
router.post('/', upload.single('theme'), validateMiddleware, function (req, res) {
	const { file } = req;
	let locale;

	try {
		locale = req.languages[0];
	} catch (e) {
		locale = 'en';
	}

	const theme = req.body;
	const { originalname } = file;

	// lower case all fields
	// ThemeSchemas.required.forEach(field => body[field] = normalize(body[field]));

	// keep original name if the file
	const newFilePath = path.join(envVariables.THEME_STORAGE, originalname);
	fs.rename(file.path, newFilePath, function (err) {
		if (err) {
			return res.status(STATUS_CODES['400']).json(err);
		}
		file.path = newFilePath;

		EmailService.sandThemeSuccessfulNotify(locale, theme.email)
			.then(() => EmailService.sandThemeEmail(file, theme))
			.then((info) => {
				res.status(200).json(JSON.stringify(info));
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});
});

module.exports = router;