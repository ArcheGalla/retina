import axios from 'axios';
import './registration-modal.scss';
import $ from 'jquery';

$('#name').focus();

class DateChecker {
	constructor() {
		const first = new Date();
		const second = new Date();

		first.setYear(2017);
		first.setMonth(12);
		first.setDate(31);

		second.setYear(2018);
		second.setMonth(3);
		second.setDate(31);

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

class MoneyCalculus {
	constructor(dc) {
		this.dc = dc;
		this.counterView = $('#total-money');

		this.docFirstPrice = 1000;
		this.docSecondPrice = 1200;
		this.docThirdPrice = 1400;

		this.internFirstPrice = 700;
		this.internSecondPrice = 800;
		this.internThirdPrice = 900;

		this.dinnerFirstPrice = 700;
		this.dinnerSecondPrice = 800;
		this.dinnerThirdPrice = null;
	}

	render(total) {
		const lang = new URL(location.href).searchParams.get('lang');
		const currency = lang === 'ua' ? 'грн' : 'UAH';
		this.counterView.text(` ${total} ${currency}`);
	}

	count() {
		const doctor = document.querySelector('input[name=isDoctor]:checked').value;
		const dinner = document.querySelector('#dinner').checked;

		let total = 0;

		if (this.dc.isFirstPeriod()) {
			total += doctor === 'doctor' ? this.docFirstPrice : this.internFirstPrice;
			total += dinner ? this.dinnerFirstPrice : 0;
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

const calculus = new MoneyCalculus(new DateChecker());
calculus.recount();

const form = document.getElementById('register-form');

document.getElementById('register-form').addEventListener('change', function onFormChange() {
	calculus.recount();
}
);

$(form).submit(function (event) {

	const submit = $('#register-submit');
	submit.attr('disabled', true);

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const phone = document.querySelector('#phone').value;
	const message = document.querySelector('#message').value || 'empty';
	const position = document.querySelector('input[name=isDoctor]:checked').value;
	const dinner = document.querySelector('#dinner').checked;
	const amount = calculus.count();

	const data = { name, email, phone, message, position, dinner, amount };
	let lang = 'en';

	try {
		const searchParams = new URLSearchParams(window.location.search);
		if(searchParams.has('lang')){
			lang = searchParams.get('lang');
		}
	} catch (e){
		// default value will be english
		lang = 'en';
	}
	
	axios({
		url: '/api/checkout',
		method: 'post',
		params: {
			lang: lang
		},
		headers: { 'Content-Type': 'application/json' },
		data
	})
		.then(response => response.data)
		.then(payBtn => {
			submit.attr('disabled', false);
			$('#pay-hide-area').hide();
			$('#pay-insert-area').append(payBtn);
		})
		.catch(() => submit.attr('disabled', false));
	event.preventDefault();
});


$('#registration-modal').on('shown.bs.modal', function () {

})
	.on('hide.bs.modal', function () {
		$('#register-form')[0].reset();

		const forms = document.querySelectorAll('#pay-insert-area > form');

		if (forms) {
			forms.forEach( el => el.remove())
		}

		$('#pay-hide-area').show();
	});
