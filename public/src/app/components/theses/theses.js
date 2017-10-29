import $ from 'jquery';
import './theses.scss';

const themeForm = document.querySelector('#theses-modal form');
const submit = $('#theme-submit');
const alertSuccess = $('#alert-success');
const alertDanger = $('#alert-danger');

function submitTheme(event) {
	submit.attr('disabled', true);

	window
		.fetch('/api/themes', {
			method: 'POST',
			body: new FormData(document.querySelector('#theses-modal form'))
		})
		.then((response) => {
			if (response.ok) {
				alertSuccess.css({ display: 'block' });
				setTimeout(() => alertSuccess.css({ display: 'none' }), 5500);
				submit.attr('disabled', false);
				document.querySelector('#theses-modal form').reset();
			} else throw new Error('Filed to submit theme');
		})
		.catch(() => {
			submit.attr('disabled', false);
			alertDanger.css({ display: 'block' });
			setTimeout(() => alertDanger.css({ display: 'none' }), 2500);
		});

	event.preventDefault();
	event.stopImmediatePropagation();
}

function onModalOpen() {
	$('#theses-modal #name').focus();
}

function onModalClose() {
	themeForm.reset();
}

themeForm.addEventListener('submit', submitTheme);

$('#theses-modal')
	.on('shown.bs.modal', onModalOpen)
	.on('hide.bs.modal', onModalClose);
