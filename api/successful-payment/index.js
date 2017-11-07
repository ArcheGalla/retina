const express = require('express');
const router = express.Router();
const Mailer = require('../services/mailer');

router.post('/', function (req, res) {
    const payment = req.body.payment;
    // Mailer.sandNewRegistrationEmail(client, order_id);
    // Mailer.sandNewRegistrationNotifyEmail(client);

    res.status(200).json({ status: '200' })
});

module.exports = router;