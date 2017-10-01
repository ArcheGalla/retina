const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {user: 'retinalviv@gmail.com', pass: 'REtinaLViv02'},
});

router.get('/register', function(req, res) {
  const user = {
    name: req.body.name || ' error name ',
    sname: req.body.sname || ' error sname ',
    phone: req.body.phone || ' error phone ',
    city: req.body.city || ' error city ',
    email: req.body.email || ' error email ',
    message: req.body.message || ' empty message',
    intern: req.body.intern || 'not selected',
  };

// setup e-mail data with unicode symbols
  const mailOptions = {
    from: 'New User <retinalviv@gmail.com>',
    to: 'retinalviv@gmail.com, evgeniya.volkova1911@gmail.com',
    subject: 'meeting member',
    text: 'Дані про нового учасника ' +
    ' /n ' + user.name +
    ' /n ' + user.sname +
    ' /n ' + user.email +
    ' /n ' + user.phone +
    ' /n ' + user.city +
    ' /n  is it Intern ?' + user.intern +
    ' /n ' + user.message,
    html: 'Дані про нового учасника ' +
    ' <br> ' + user.name +
    ' <br> ' + user.sname +
    ' <br> ' + user.email +
    ' <br> ' + user.phone +
    ' <br> ' + user.city +
    ' <br/> is it Intern ? ' + user.intern +
    ' <br/> ' + user.message,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.status(401).json(error);
    }

    res.status(200).send(info);
  });
});

module.exports = router;
