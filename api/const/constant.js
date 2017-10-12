const { PORT, NODE_ENV, STORAGE, EMAIL, PASSWORD } = process.env;
// retinalviv@gmail.com
// REtinaLViv02
if (!PORT || !NODE_ENV || !STORAGE) {
	throw new Error('Not enough env variables');
}

module.exports = { PORT, NODE_ENV, STORAGE, EMAIL, PASSWORD };



