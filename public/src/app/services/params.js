class Params {
	constructor() {
		this.searchParams = new window.URL(window.location.href).searchParams;
	}

	hasPaymentKey() {
		return this.searchParams.has('payment');
	}

	getPaymentKey() {
		return this.searchParams.get('payment');
	}

	removePaymentKey() {
		console.log('this.searchParams',this.getPaymentKey());
		this.searchParams.delete('payment');
		console.log('this.searchParams',this.getPaymentKey());
	}

	getLanguage() {
		return this.searchParams.get('lang');
	}

	isUa() {
		return this.searchParams.get('lang') === 'ua';
	}

	isEng() {
		return this.searchParams.get('lang') === 'en';
	}
}

export const paramsService = new Params();