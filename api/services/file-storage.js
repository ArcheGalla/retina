const fs = require('fs');
const PDFDocument = require('pdfkit');
const exist = require('file-exists');
const homePath = require('../const/constant').STORAGE;

function generateFile(filePath, theme) {

	const doc = new PDFDocument();

	doc.pipe(fs.createWriteStream(filePath));

	let top = 10;
	const leftPadding = 30;
	const topPadding = (step) => step ? top += 20 + step : top += 20;

	doc
		.fontSize(18)
		.text(`Phone: ${theme.phone}`, leftPadding, topPadding())
		.text(`Name: ${theme.name}`, leftPadding, topPadding())
		.text(`Surname: ${theme.surname}`, leftPadding, topPadding())
		.text(`Email: ${theme.email}`, leftPadding, topPadding())
		.text(`Topic: ${theme.topic}`, leftPadding, topPadding())
		.text(`Position: ${theme.position}`, leftPadding, topPadding())
		.text(`Place: ${theme.place}`, leftPadding, topPadding())
		.text(`City: ${theme.city}`, leftPadding, topPadding())
		.text(`Country: ${theme.country}`, leftPadding, topPadding());

	doc.text(`Description: ${theme.description}`, leftPadding, topPadding(10));

	doc.end();
}

function getAbsolutePath(filePath) {
	return `${homePath}/${filePath}`;
}

function generateFileName(email, name, topic) {
	return `${name}:${email}:${Date.now()}${topic}.pdf`;
}

function isFileExist(path) {
	return exist(path);
}

function createFile(theme) {
	return new Promise((resolve, reject) => {
		const { email, name, topic } = theme;
		const fileName = generateFileName(email, name, topic);

		const abPath = getAbsolutePath(fileName);
		isFileExist(abPath).then(function () {
			generateFile(abPath, theme);
			resolve();
		}).catch(reject)
	});
}

module.exports = {
	createFile
};