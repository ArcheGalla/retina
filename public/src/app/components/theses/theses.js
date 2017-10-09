import $ from 'jquery';
import './theses.scss';

$('#theses-modal').on('shown.bs.modal', function () {
	$('#name').focus();

	$("form.modal-content").submit(function (event) {
		const name = $('#name').val();
		const surname = $('#surname').val();
		const position = $('#position').val();
		const place = $('#place').val();
		const city = $('#city').val();
		const country = $('#country').val();
		const email = $('#email').val();
		const phone = $('#phone').val();
		const theseName = $('#these-name').val();
		const description = $('#description').val();

		const params = {
			name, surname, position, place, city, country, email, phone, theseName, description
		};

		$.ajax('', params).then(function () {

		}).catch(err => {
			console.log('err ', err);
		});

		event.preventDefault();
		event.stopImmediatePropagation();
	});
});
