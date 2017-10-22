const express = require('express');
const router = express.Router();
const themes = require('./themes');

//const register = require('./register');
//router.use('/register', register);

router.use('/themes', themes);

module.exports = router;
