const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const index = require('./api/router');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const i18n = require('i18n');
const api = require('./api');

const app = express();

const envConstants = require('./api/const/constant');

i18n.configure({
	locales: ['ua', 'en'],
	extension: '.json',
	directory: path.join(__dirname, 'api/locales'),
	defaultLocale: 'ua',
	cookie: 'lang',
	objectNotation: true,
	updateFiles: false,
	queryParameter: 'lang',
	preserveLegacyCase: true,
	logDebugFn: (info) => console.log('i18n log debug info ', info),
	logWarnFn: (warning) => console.log('i18n log warning info ', warning),
	logErrorFn: (Error) => console.log('i18n log error info ', error),
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(i18n.init);

//app.use('/', index);
app.use('/api', api);

app.use(function (req, res, next) {
	if (req.path === '' || req.path === '/') {
		if (req.query.lang) next();
		else res.redirect('/?lang=ua')
	} else next();
});

app.use('/', index);

if (envConstants.NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const config = require('./public/webpack.config.js');
	const compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));
}

if (envConstants.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'public', 'dist')));
	app.use(express.static(path.join(__dirname, 'public', 'dist', 'assets')));
	app.use(favicon(path.join(__dirname, 'public', 'dist', 'favicon.ico')));
}

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

app.set('views', path.join(__dirname, 'public/src'));
app.set('view engine', 'pug');

module.exports = app;
