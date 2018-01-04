const Store = require('nedb');
const path = require('path');
const storageLocation = require('../../const/constant').NEDB_PATH;

const ClientsStore = new Store({
		filename: path.join(storageLocation, 'clients.db'),
		timestampData: true,
		autoload: true,
});

module.exports = ClientsStore;
