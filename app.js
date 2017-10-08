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

const NODE_ENV = process.env.NODE_ENV;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

i18n.configure({
	locales: ['ua', 'en'],
	directory: path.join(__dirname, 'locales'),
	defaultLocale: 'ua',
	//cookie: 'retina',
	objectNotation: true,
	updateFiles: false,
	queryParameter: 'lang',
});


app.use(i18n.init);

if (NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const config = require('./public/webpack.config.js');
	const compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));
}

if (NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'public', 'dist')));
	app.use(express.static(path.join(__dirname, 'public', 'dist', 'assets')));
	app.use(favicon(path.join(__dirname, 'public', 'dist', 'favicon.ico')));
}

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
app.use('/', index);
app.use('/api', api);

app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
