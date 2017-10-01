const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const i18n = require('i18n');
const index = require('./routes/index');
const api = require('./api');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const port = NODE_ENV === 'development' ? 3000 : 80;

if (NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('./public/webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(sassMiddleware({
    src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public'), indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
}));

app.use(i18n.init);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

i18n.configure({
    locales: ['ua', 'den'],
    directory: __dirname + '/locales',
    defaultLocale: 'ua',
    queryParameter: 'lang',  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
});

app.use('/assets/images', express.static(path.join(__dirname, 'public/images')));
app.use('stylesheets/assets/images/', express.static(path.join(__dirname, 'public/images/')));

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
