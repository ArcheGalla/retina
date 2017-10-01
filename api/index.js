// const mailer = require('./mailer/mailer');
const express = require('express');
const router = express.Router();

router.get('/health', function(req, res) {
  // res.send('respond with a resource');
  console.log('Response ', res);

  res.status(200).json({ 'health': 'Ok' });
});

// router.use(mailer);

module.exports = router;
