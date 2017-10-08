const express = require('express');
const router = express.Router();
const production = process.env.NODE_ENV === 'production';

const headerData = require('../public/src/app/components/header/header.json');
const { result_photo, result_video, result_record } = headerData;
let script = 'bundle.js';
let style = '';

if (production) {
	manifest = require('../public/dist/manifest.json');
	const { assets } = manifest;
	script = assets['bundle.js'];
	style = assets['bundle.css'];
}

router.get('/', function (req, res) {

	res.render('index', {
		__: res.__,
		lang: req.locale,
		production,
		script,
		style,
		result_photo,
		result_video,
		result_record
	});
});

module.exports = router;
