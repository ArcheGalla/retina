const express = require('express');
const router = express.Router();

const themes = require('./themes');
const checkout = require('./checkout');
// const successful = require('./successful-payment');

router.use('/themes', themes);
router.use('/checkout', checkout);
// router.use('/successful/payment', successful);

module.exports = router;
