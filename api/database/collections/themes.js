const Store = require('nedb');
const path = require('path');
const storageLocation = require('../../const/constant').NEDB_PATH;

const Themes = new Store({
		filename: path.join(storageLocation, 'themes.db'),
		autoload: true
});

module.exports = Themes;