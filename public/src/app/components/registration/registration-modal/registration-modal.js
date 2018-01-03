import { paramsService } from '../../../services/params';
import './registration-modal.scss';
import axios from 'axios';
import $ from 'jquery';

class DateChecker {
	constructor() {
		const first = new Date(Date.UTC(2017, 11, 31));
		const second = new Date(Date.UTC(2018, 2, 31));

		this.firstBarrer = first.getTime();
		this.secondBarrer = second.getTime();
	}

	isFirstPeriod() {
		const current = new Date().getTime();
		return current < this.firstBarrer;
	}

	isSecondPeriod() {
		const current = new Date().getTime();
		return current < this.secondBarrer;

	}
}

class MoneyCalculusUa {
	constructor(dc) {
		this.dc = dc;
		this.counterView = $('#total-money');

		this.docPrice = 1000;
		this.docSecondPrice = 1200;
		this.docThirdPrice = 1400;

		this.internPrice = 700;
		this.internSecondPrice = 800;
		this.internThirdPrice = 900;

		this.dinnerPrice = 900;
		this.dinnerSecondPrice = 1100;
		this.dinnerThirdPrice = 1100;
	}

	render(total) {
		this.counterView.text(` ${total} грн`);
	}

	count() {
		const doctor = document.querySelector('input[name=isDoctor]:checked').value;
		const dinner = document.querySelector('#dinner').checked;

		let total = 0;

		if (this.dc.isFirstPeriod()) {
			total += doctor === 'doctor' ? this.docPrice : this.internPrice;
			total += dinner ? this.dinnerPrice : 0;
		} else if (this.dc.isSecondPeriod()) {
			total += doctor === 'doctor' ? this.docSecondPrice : this.internSecondPrice;
			total += dinner ? this.dinnerSecondPrice : 0;
		} else {
			total += doctor === 'doctor' ? this.docThirdPrice : this.internThirdPrice;
			total += dinner ? this.dinnerThirdPrice : 0;
		}

		return total;
	}

	recount() {
		const total = this.count();
		this.render(total);
	}
}

class ModelCalculusEng {
	constructor(dc) {
		this.dc = dc;
		this.counterView = $('#total-money');

			this.docPrice = 60;
			this.docSecondPrice = 70;
			this.docThirdPrice = 80;

			this.internPrice = 40;
			this.internSecondPrice = 50;
			this.internThirdPrice = 60;

			this.dinnerPrice = 40;
			this.dinnerSecondPrice = 40;
			this.dinnerThirdPrice = 40;

	}

	render(total) {
		this.counterView.text(` ${total} EUR`);
	}

	count() {
		const doctor = document.querySelector('input[name=isDoctor]:checked').value;
		const dinner = document.querySelector('#dinner').checked;

		let total = 0;

		//total += doctor === 'doctor' ? this.docPrice : this.internPrice;
		//total += dinner ? this.dinnerPrice : 0;
			if (this.dc.isFirstPeriod()) {
					total += doctor === 'doctor' ? this.docPrice : this.internPrice;
					total += dinner ? this.dinnerPrice : 0;
			} else if (this.dc.isSecondPeriod()) {
					total += doctor === 'doctor' ? this.docSecondPrice : this.internSecondPrice;
					total += dinner ? this.dinnerSecondPrice : 0;
			} else {
					total += doctor === 'doctor' ? this.docThirdPrice : this.internThirdPrice;
					total += dinner ? this.dinnerThirdPrice : 0;
			}
		return total;
	}

	recount() {
		const total = this.count();
		this.render(total);
	}
}

let calculus;

if (paramsService.isUa()) {
	calculus = new MoneyCalculusUa(new DateChecker());
} else {
	calculus = new ModelCalculusEng(new DateChecker());
}

calculus.recount();

const form = document.getElementById('register-form');

form.addEventListener('change', function onFormChange() {
	calculus.recount();
});

$(form).submit(function (event) {

	const submit = $('#register-submit');
	submit.attr('disabled', true);

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const phone = document.querySelector('#phone').value;
	const message = document.querySelector('#message').value || 'empty';
	const position = document.querySelector('input[name=isDoctor]:checked').value;
	const dinner = document.querySelector('#dinner').checked;

	const country = document.querySelector('#register-country').value;
	const city = document.querySelector('#register-city').value;
	const work = document.querySelector('#register-work-place').value;


	const amount = calculus.count();

	const data = { name, email, phone, message, position, dinner, amount, country, city, work };

	axios({
		url: '/api/checkout',
		method: 'post',
		params: {
			lang: paramsService.getLanguage()
		},
		headers: { 'Content-Type': 'application/json' },
		data
	})
		.then(response => response.data)
		.then(payBtn => {
			submit.attr('disabled', false);
			$('#finish-message').css({display : 'flex'});
			$('#pay-hide-area').hide();
			$('#pay-insert-area').append(payBtn);
		})
		.catch(() => submit.attr('disabled', false));
	event.preventDefault();
});

function onRegisterModalOpen() {
	$('#name').focus();
}

function onRegisterModalClose() {
	$('#register-form')[0].reset();
	$('#finish-message').css({ display : 'none' });

	const forms = document.querySelectorAll('#pay-insert-area > form');

	if (forms) {
		forms.forEach(el => el.remove())
	}

	$('#pay-hide-area').show();
}

$('#registration-modal')
	.on('shown.bs.modal', onRegisterModalOpen)
	.on('hide.bs.modal', onRegisterModalClose);
