const envVariables = require('../../const/constant');

module.exports = {
	getSubmitThemeEmailMessage(file, theme) {
		return {
			to: envVariables.EMAIL,
			subject: 'Нова теза',
			text: `
				Нова теза:
				/n Ім'я - ${theme.name} ${theme.surname}
				/n Email - ${theme.email}
				/n Телефон - ${theme.phone}
				/n Місто - ${theme.city}
				/n Посада - ${theme.position}
				/n Місце роботи - ${theme.place}
				/n Країна - ${theme.country}
				/n Тема - ${theme.topic}
			`,
			html: `
			
			<table>
			  <tr>
				<td>Ім'я</td>
				<td>${theme.name} ${theme.surname}</td>
			  </tr>
			  <tr>
				<td>Email</td>
				<td>${theme.email}</td>
			  </tr>
			  <tr>
				<td>Телефон</td>
				<td>${theme.phone}</td>
			  </tr>
			  <tr>
				<td>Місто</td>
				<td>${theme.city}</td>
			  </tr>
			  <tr>
				<td>Посада</td>
				<td>${theme.position}</td>
			  </tr>
			  <tr>
				<td>Місце роботи</td>
				<td>${theme.place}</td>
			  </tr>
			  <tr>
				<td>Країна</td>
				<td>${theme.country}</td>
			  </tr>
			  <tr>
				<td>Тема</td>
				<td>${theme.topic}</td>
			  </tr>
			</table>`,
			attachments: [{
				//filename: file.originalname || 'nyan cat ✔.gif',
				filename: file.originalname,
				path: file.path,
				//cid: 'nyan@example.com' // should be as unique as possible
			}]
		};
	},
	getThemeSuccessfulNotifyMessage(lang, email) {
		let subject, text, html = '';

		if (lang === 'ua') {
			subject = 'Теза прийнята';
			text = 'Ви успішно подали заявку на проведення доповіді. Дякуємо';
			html = '<p>Ви успішно подали заявку на проведення доповіді. Дякуємо</p>';
		} else if (lang === 'en') {
			subject = 'Theme is accepted';
			text = 'Theme is accepted. Thank you';
			html = '<p>Theme is accepted. Thank you</p>';
		} else {
		}

		return { to: email, subject, text, html }
	},
	getSuccessfulPaymentEmailMessage(lang, to) {
		return {
			to: to,
			subject: 'SuccessfulPaymentEmail',
			text: 'SuccessfulPaymentEmail',
			html: `SuccessfulPaymentEmail`
		}
	}
};
