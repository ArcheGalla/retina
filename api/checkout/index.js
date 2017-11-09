const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const ENV = require('../const/constant');
const LiqPay = require('../lib/sdk-nodejs/lib/liqpay');

const liqPaySdk = new LiqPay(ENV.LIQPAY_PUBLIC, ENV.LIQPAY_SECRET);
const Mailer = require('../services/mailer');

const Joi = require('joi');
const { RequestClientSchema, SaveClientSchema } = require('../database/model/client');

const uaTicket = 'Retina Lviv 2017 - квиток';
const enTicket = 'Retina Lviv 2017 - tickets';

const ClientsStore = require('../database/collections/clients');

function validateMiddleWare(req, res, next) {
		const client = req.body;

		const { lang } = req.query;

		if (lang !== 'ua' || lang !== 'en') {
				return res.status(403).json({ lang: 'lang query param is missing' });
		}

		Joi.validate(client, RequestClientSchema, (err, value) => {
				if (err) return res.status(403).json(err);
				console.log('value ', value);
				next();
		});
}

router.post('/', validateMiddleWare, function (req, res) {
		const client = req.body;
		const { amount } = client;
		const { lang } = req.query;

		// generate unique key
		const orderId = uuidv1();

		client.orderId = orderId;
		client.paid = false;

		Joi.validate(client, SaveClientSchema, function (err) {
				if (err) return res.status(403).json(err);

				ClientsStore.insert(client, function (err) {
						if (err) return res.status(403).json(err);
						// Mailer.sandNewRegistrationEmail(client, order_id);
						// Mailer.sandNewRegistrationNotifyEmail(client);

						// todo: check is ua lang fixed from liq pay side
						const paymentDescription = lang === 'ua' ? uaTicket : enTicket;
						const language = lang === 'ua' ? 'ru' : 'en';
						const currency = lang === 'ua' ? 'UAH': 'EUR';

						const resultUrl = ENV.NODE_ENV === 'development' ?
							`http://localhost:3000/?lang=${lang}&payment=${orderId}` :
							`http://retina-lviv.com/?lang=${lang}&payment=${orderId}`;

						// enable development/testing env on liq pay side
						const sandbox = ENV.NODE_ENV === 'development' ? 1 : 0;

						const html = liqPaySdk.cnb_form({
								'action': 'pay',
								'amount': ENV.NODE_ENV === 'development' ? '0.01' : amount,
								'currency': currency,
								'description': paymentDescription,
								'language': language,
								'order_id': orderId,
								'version': '3',
								'sandbox': sandbox,
								'result_url': resultUrl
						});

						res.status(200).json(html);
				});
		});
});

module.exports = router;
