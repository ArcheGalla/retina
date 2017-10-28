const { Validator } = require('express-json-validator-middleware');
const envVariables = require('../../api/const/constant');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmailService = require('../services/mailer');
const STATUS_CODES = require('http').STATUS_CODES;
const dest = path.resolve(envVariables.THEME_STORAGE);
const upload = multer({ dest });

router.post('/', upload.single('theme'), function (req, res) {
	console.log('req.file ', req.file);
	console.log('req.body ', req.body);

	const { file } = req;
	let locale;

	try {
		locale = req.languages[0];
	} catch (e) {
		locale = 'en';
	}

	const theme = req.body;
	console.log('file',file);

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