import axios from 'axios';
import './registration-modal.scss';
import $ from 'jquery';

let unsubscribe = () => {
};

$('#registration-modal').on('shown.bs.modal', function () {
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
	//const form = $('#registerForm');

	document.getElementById('register-form').addEventListener('change', function onFormChange() {
			calculus.recount();
		}
	);

	//unsubscribe = function () {
	//	console.log('remove listener');
	//
	//	form.removeEventListener('change', onFormChange);
	//};

	$(form).submit(function (event) {
		console.log('submit action ');

		//event.stopImmediatePropagation();
		//event.preventDefault();
		const submit = $('#register-submit');
		submit.attr('disabled', true);

		const name = document.querySelector('#name').value;
		const email = document.querySelector('#email').value;
		const phone = document.querySelector('#phone').value;
		const message = document.querySelector('#message').value || 'empty';
		const position = document.querySelector('input[name=isDoctor]:checked').value;
		const dinner = document.querySelector('#dinner').checked;
		const amount = calculus.count();

		const headers = new Headers();

		headers.append('Content-Type', 'application/json');

		axios({
			url: '/api/checkout',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: { name, email, phone, message, position, dinner, amount }
		})
			.then(function (res) {
				console.log('res ', res);


				return res;
			})
			.then(response => response.data)
			.then(function (payBtn) {
				submit.attr('disabled', false);
				$('#pay-hide-area').remove();
				$('#pay-insert-area').append(payBtn);
			})
			.catch(function (error) {
				submit.attr('disabled', false);
				console.log('error', error)
			});
		//window.fetch('/api/checkout', { method: 'POST', headers, body })
		//	.then(response => response.json())
		//	.then(payBtn => {
		//		submit.attr('disabled', false);
		//		$('#pay-hide-area').remove();
		//		$('#pay-insert-area').append(payBtn);
		//	})
		//	.catch(err => {
		//		submit.attr('disabled', false);
		//		console.log('e', err)
		//	});

		//event.stopImmediatePropagation();
		event.preventDefault();
	});
})
/*.on('hide.bs.modal', function () {
	unsubscribe();
	unsubscribe = () => {
	};
})*/;
