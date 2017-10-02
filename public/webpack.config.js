const _ = require('lodash');
const _configs = {

	global: require(__dirname + '/config/webpack/global'),
	production: require(__dirname + '/config/webpack/environments/production'),
	development: require(__dirname + '/config/webpack/environments/development')
};

const _load = function () {
	const ENV = process.env.NODE_ENV
		? process.env.NODE_ENV
		: 'production';

	console.log('Current Environment: ', ENV);

	return _configs && _.merge(
		_configs.global(__dirname),
		_configs[ENV](__dirname)
	);
};

module.exports = _load();
