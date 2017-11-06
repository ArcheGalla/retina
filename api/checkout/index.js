const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const ENV = require('../const/constant');
const LiqPay = require('../lib/sdk-nodejs/lib/liqpay');

const liqPaySdk = new LiqPay(ENV.LIQPAY_PUBLIC, ENV.LIQPAY_SECRET);
const Mailer = require('../services/mailer');

router.post('/', function (req, res) {
	const client = req.body;
	const { amount } = client;
	try {
		var locale = req.query.lang;
	} catch (e) {
		locale = 'en';
	}

	try {
		const order_id = uuidv1();

		Mailer.sandNewRegistrationEmail(client, order_id);
		Mailer.sandNewRegistrationNotifyEmail(client);

		const uaTicket = 'Retina Lviv 2017 - квиток';
		const enTicket = 'Retina Lviv 2017 - tickets';

		const paymentDescription = locale === 'ua' ? uaTicket : enTicket;
		const language = locale === 'ua' ? 'ru' : 'en'; // uk, en
		const result_url = ENV.NODE_ENV === 'development' ? `http://localhost:3000/?lang=${locale}&order=${order_id}` : `http://retina-lviv.com/?lang=${locale}&order=${order_id}`;

		/*	
			Put sandbox param to set development env as show bellow
			'sandbox': ENV.NODE_ENV === 'development' ? 1 : 0,
		*/
		const html = liqPaySdk.cnb_form({
			'action': 'pay',
			'amount': amount,
			'currency': 'UAH',
			'description': paymentDescription,
			'language': language,
			'order_id': order_id,
			'version': '3',
			'result_url': result_url
		});

		res.status(200).json(html);
	} catch (e) {
		res.status(401).json(e);
	}
});

module.exports = router;
