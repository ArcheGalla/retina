const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const index = require('./routes/index');
const api = require('./api');
const app = express();

const envConstants = require('./api/constant');

i18n.configure({
	locales: ['ua', 'en'],
	directory: path.join(__dirname, 'locales'),
	defaultLocale: 'ua',
	cookie: 'retina',
	objectNotation: true,
	updateFiles: false,
	queryParameter: 'lang',
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(i18n.init);

if (envConstants.ENV === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const config = require('./public/webpack.config.js');
	const compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));
}

if (envConstants.ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'public', 'dist')));
	app.use(express.static(path.join(__dirname, 'public', 'dist', 'assets')));
	app.use(favicon(path.join(__dirname, 'public', 'dist', 'favicon.ico')));
}

app.use(function (req, res, next) {
	if (req.query.lang) next();
	else {
		res.redirect('/?lang=ua')
	}
});

app.use('/', index);
app.use('/api', api);

app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	let responseData;

	if (err.name === 'JsonSchemaValidation') {
		res.status(400);
		responseData = {
			statusText: 'Bad Request',
			jsonSchemaValidation: true,
			validations: err.validations
		};
		// Take into account the content type if your app serves various content types
		//if (req.xhr || req.get('Content-Type') === 'application/json') {
		//	res.json(responseData);
		//} else {
		// If this is an html request then you should probably have
		// some type of Bad Request html template to respond with
		//res.render('badrequestTemplate', responseData);
		//}
	} else {
		next(err);
	}
});

app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

module.exports = app;
