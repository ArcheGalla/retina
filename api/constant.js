const path = require('path');

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
const STORAGE_PATH = process.env.STORAGE;

if (typeof PORT !== 'number') {
	throw new Error('Port should be defined as number');
}

if (ENV !== 'development' || ENV !== 'production') {
	throw new Error('NODE_EVN should be defined as enum string `development` or `production`');
}

if (typeof STORAGE_PATH !== 'string' && !path.isAbsolute(STORAGE_PATH)) {
	throw new Error('STORAGE_PATH should be defined as absolute string path');
}

module.exports = { PORT, ENV, STORAGE_PATH };



