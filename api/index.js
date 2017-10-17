const express = require('express');
const router = express.Router();
const themes = require('./themes');
//const register = require('./register');

router.get('/health', function(req, res) {
	res.status(200).json({ 'health': 'Ok' });
});

router.use('/themes', themes);
//router.use('/register', register);

module.exports = router;
