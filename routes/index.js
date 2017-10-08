const express = require('express');
const router = express.Router();
const i18n = require('i18n');
const production = process.env.NODE_ENV === 'production';

let script = 'bundle.js';
let style = '';

if (production) {
	manifest = require('../public/dist/manifest.json');
	const { assets } = manifest;
	script = assets['bundle.js'];
	style = assets['bundle.css'];
}

router.get('/', function (req, res) {
	console.log('##############################################');
	//console.log('res.__', res.locals.__n('HEADER.NAV_ABOUT'));
	console.log(req.query.lang);
	console.log(req.setLocale(req.query.lang || 'ua'));
	//req.params.lang
	console.log(res.__('HEADER.NAV_ABOUT'));
	console.log('##############################################');

	res.render('index', {
		__: req.__,
		lang: req.locale,
		production,
		script,
		style
	});
});

module.exports = router;
