require('dotenv').config();

const { PORT, NODE_ENV, STORAGE, EMAIL, EMAIL_PASSWORD, THEME_STORAGE, LIQPAY_PUBLIC, LIQPAY_SECRET } = process.env;

if (!PORT || !NODE_ENV || !STORAGE || !EMAIL || !EMAIL_PASSWORD || !LIQPAY_PUBLIC || !LIQPAY_SECRET) {
	throw new Error('Not enough env variables');
}

module.exports = {
	PORT,
	NODE_ENV,
	STORAGE,
	THEME_STORAGE,
	EMAIL,
	EMAIL_PASSWORD,
	LIQPAY_PUBLIC,
	LIQPAY_SECRET
};
