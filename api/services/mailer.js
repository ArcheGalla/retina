const env = require('../const/constant');
const mailer = require('nodemailer');

const transporter = mailer.createTransport('SMTP', {
	service: 'Gmail', auth: { user: env.EMAIL, pass: env.PASSWORD },
});

function composeEmailBodyHtml(user) {
	return `
 		<h3>Дані про нового учасника</h3> 
 		<br> <p>${user.name}</p> 
 		<br> <p>${user.surname} </p>
 		<br> <p>${user.email}</p>
 		<br> <p>${user.phone}</p>
	  	<br> <p>${user.city} </p>
	  	<br> <p>is it Intern ? ${user.intern}</p>
		<br> <p>${user.message}</p>
	`;
}

function composeEmailBodyText(user) {
	return `
 		Дані про нового учасника 
 		/n ${user.name} 
 		/n ${user.surname} 
 		/n ${user.email}
 		/n ${user.phone}
	  	/n ${user.city} 
	  	/n is it Intern ? ${user.intern}
		/n ${user.message}
	`;
}

function composeEmailOptions(user, file) {
	const mailOptions = {
		from: `New User <${env.EMAIL}>`,
		to: 'retinalviv@gmail.com, ',
		subject: 'New comer',
		text: composeEmailBodyText(user),
		html: composeEmailBodyHtml(user),
	};

	if (file) {
		// do some stuff
	}

	return mailOptions;
}

function sendEmail(user, file) {
	return new Promise((resolve, reject) => {
		transporter.sendMail(composeEmailOptions(user, file), function (error, info) {
			if (error) {
				reject()
			} else {
				resolve(info)
			}
		});
	});
}

module.exports = { sendEmail };