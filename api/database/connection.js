
//db.once('open', function () {
//	log.info('Connected to database');
//	launchMyServer()
//});
//or if you want to use it in another file :

//module.exports = function initConnection(callback) {
//	mongoose.connect(config.db, {});
//	var db = mongoose.connection;
//	db.on('error', function (err) {
//		log.error('Failed to connect to database');
//		process.exit(1);
//	});
//
//	db.once('open', function () {
//		log.info("Connected to database");
//		callback();
//	});
//};