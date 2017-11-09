import $ from 'jquery';
import { paramsService } from './params';
import axios from 'axios';

$(function () {
	if (paramsService.hasPaymentKey()) {
		const paymentId = paramsService.getPaymentKey();

		axios({
			url: '/api/successful/payment',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: { paymentId }
		})
			.then(function (res) {
				console.log('then ', res);
			})
			.catch(function (err) {
				console.log('catch ', err);
			});
	}
});