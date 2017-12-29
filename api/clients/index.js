const express = require('express');
const router = express.Router();

const Clients = require('../database/collections/clients');

router.get('/', function (req, res) {
		Clients.find({}, function (err, docs) {
				if (!err) {
						return res.status(200).json(docs);
				}
				res.status(403).json({ message: 'Failed to get clients' });
		});
});

module.exports = router;