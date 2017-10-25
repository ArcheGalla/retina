const express = require('express');
const router = express.Router();
const themes = require('./themes');
const LiqPay = require('./lib/sdk-nodejs/lib/liqpay');
const uuidv1 = require('uuid/v1');
const liqpay = new LiqPay('i45547894422', 'SSUq0Baf1yuNxSw279n2n6jjBeipGSo0pY2VHvlK');
router.use('/themes', themes);

router.post('/checkout', function (req, res) {
	const html = liqpay.cnb_form({
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
