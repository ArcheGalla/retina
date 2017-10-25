const express = require('express');
const router = express.Router();

const themes = require('./themes');
const checkout = require('./checkout');

router.use('/themes', themes);
router.use('/checkout', checkout);

module.exports = router;
