const ENV = require('../../const/constant');

module.exports = {
		getSubmitThemeEmailMessage(file, theme) {
				return {
						to: ENV.EMAIL,
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
		getNewRegistrationSubmitMessage(client, order_id) {
				return {
						to: ENV.EMAIL,
						subject: `New registration id ${order_id}`,
						text: `
				New incoming request for registration \n
				Name: ${client.name} \n
				Email: ${client.email} \n
				Phone: ${client.phone} \n
				Message: ${client.message} \n
				Position: ${client.position} \n
				Dinner: ${client.dinner} \n
				Country: ${client.country} \n
				City: ${client.city} \n
				Work: ${client.work} \n
				Id: ${order_id}
			`,
						html: `
				<h2>New Successful registration</h2>
				<ul>
					<li>Name: ${client.name}</li>
					<li>Email: ${client.email}</li>
					<li>Phone: ${client.phone}</li>
					<li>Message: ${client.message}</li>
					<li>Position: ${client.position} </li>
					<li>Dinner: ${client.dinner}</li>
					<li>Country: ${client.country}</li>
					<li>City: ${client.city}</li>
					<li>Work: ${client.work}</li>
					<li>Id: ${order_id}</li>
				</ul>
				
			`
				};
		},
		getNewRegistrationNotifyEmail(client, lang) {
				const ua = {
						to: client.email,
						subject: 'Квиток',
						text: `
				 Дякуємо за участь!
				 На даний момент ми не маємо системи квитків. Ідентифікація буде відбуватись на основі ім'я та номеру телефону.
			`,
						html: `
				 <h2>Дякуємо за участь!</h2>	
				 <p>На даний момент ми не маємо системи квитків. Ідентифікація буде відбуватись на основі ім'я та номеру телефону.</p>
			`
				};
				const eng = {
						to: client.email,
						subject: 'Ticket notify ',
						text: `
				 Thanks for participate!
				 Currently we don't have any ticket system. The identification will be based by the name and phone number 
			`,
						html: `
				 <h2>Thanks for participate!</h2>	
				 <p>Currently we don't have any ticket system. The identification will be based by the name and phone number </p>
			`
				};

				if (lang === 'ua') {
						return ua;
				} else {
						return eng;
				}

		}
};
