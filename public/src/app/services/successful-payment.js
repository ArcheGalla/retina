import $ from 'jquery';
import { paramsService } from './params';
import axios from 'axios';

$(function () {
		if (paramsService.hasPaymentKey()) {
				const paymentId = paramsService.getPaymentKey();
				axios({
						url: '/api/successful/payment',
						method: 'post',
						params: {
								lang: paramsService.getLanguage()
						},
						headers: { 'Content-Type': 'application/json' },
						data: { paymentId }
				})
					.then(function () {
							console.log('successful/payment');
					})
					.catch(function (err) {
							console.log(err);
					});
		}
});