const Store = require('nedb');
const path = require('path');
const storageLocation = require('../../const/constant').NEDB_PATH;

const ClientsStore = new Store({
		filename: path.join(storageLocation, 'clients.db'),
		autoload: true
});

module.exports = ClientsStore;

//Themes.insert(doc, function (err, result) {
//		if (err) return console.log('err ', err);
//
//		console.log('result ', result);
//});

//Themes.find({}, function (err, docs) {
//		if (err) return console.log('err ', err);
//		console.log('docs', docs);
//});