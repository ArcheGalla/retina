const express = require('express');
const router = express.Router();

const ClientsStore = require('../database/collections/clients');
const Mailer = require('../services/mailer');

function validateMiddleWare(req, res, next) {
		try {
				const { paymentId } = req.body;
				if (typeof paymentId !== 'string') {
						return res.status(403).json(e);
				}

				next();
		} catch (e) {
				res.status(403).json(e);
		}
}

router.post('/', validateMiddleWare, function (req, res) {
		const { paymentId } = req.body;

		ClientsStore.findOne({ orderId: paymentId, paid: false }, function (err, client) {
				if (err) return res.status(403).json(err);
				if (!client) return res.status(404).json({ message: 'Not client with provided orderId' });

				console.log('not update ', client);

				const { _id } = client;
				const clientUpdated = client;
				clientUpdated.paid = true;

				ClientsStore.update({ _id: _id }, clientUpdated, function (err, updated) {
						if (err) return res.status(403).json(err);
						console.log('clientUpdated', updated);

						Mailer.sandNewRegistrationEmail(updated, updated.orderId);
						Mailer.sandNewRegistrationNotifyEmail(client);

						res.status(200).json({ status: '200', message: 'successful payment' });
				});
		});
});

module.exports = router;