class StorageEngine {
	constructor() {
		this.fs = require('fs');
		this.folder = 'themes';
		this.pdfkit = require('pdfkit');
		this.path = require('path');
		this.exist = require('file-exists');
		this.homePath = require('../constant').STORAGE_PATH;
	}

	generateFile() {
		const document = new this.pdfkit();
	}

	isFileExist(email, name, theme) {
		const fileName = `author:${name}-${email}-theme:${theme}.pdf`;
		const absolutePath = this.path.join(this.homePath, this.folder, fileName);

		return this.exist(absolutePath);
	}

	createFile(email, name, theme) {
		return new Promise(() => {
			this.isFileExist(email, name, theme)
				.then((exists) => {
					if (exists) {
						return 'File already exist';
					} else {

					}
				})
				.catch(() => {

				});
		});
	}
}

module.exports = new StorageEngine();