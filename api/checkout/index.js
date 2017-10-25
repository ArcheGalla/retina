const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const ENV = require('../const/constant');
const LiqPay = require('../lib/sdk-nodejs/lib/liqpay');

const liqPaySdk = new LiqPay(ENV.LIQPAY_PUBLIC, ENV.LIQPAY_SECRET);

router.post('/', function (req, res) {
	const html = liqPaySdk.cnb_form({
			'action': 'pay',
			'amount': '10',
			'currency': 'UAH',
			'description': 'Test paymant',
			// 'language': '', uk, en
			'order_id': uuidv1(),
			'version': '3',
			// success callback => success state + id
			// reject callback => success state + id
		}
		/*,
		function success(info) {
			console.log('info', info);

			// const { url } = info;
			// res.redirect(url);
			res.json(info);
		},
		function error(err, response) {
			console.log('err', err);
			console.log('response', response);
			res.status(404).json({ err, response})
		}*/);

	res.status(200).json(html);
});

module.exports = router;