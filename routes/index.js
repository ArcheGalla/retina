const express = require('express');
const router = express.Router();

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
	res.render('index', {
		__: res.__,
		title: 'Express',
		production,
		script,
		style
	});
});

module.exports = router;
