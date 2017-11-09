const Joi = require('joi');

const RequestClientSchema = Joi
	.object()
	.keys({
			name: Joi.string().required(),
			email: Joi.string().email(),
			phone: Joi.string().required(),
			message: Joi.string().required(),
			position: Joi.string().required(),
			dinner: Joi.boolean().required(),
			amount: Joi.number().required(),
			country: Joi.string().required(),
			city: Joi.string().required(),
			work: Joi.string().required(),
	});

const SaveClientSchema = Joi
	.object()
	.keys({
			name: Joi.string().required(),
			email: Joi.string().email(),
			phone: Joi.string().required(),
			message: Joi.string().required(),
			position: Joi.string().required(),
			dinner: Joi.boolean().required(),
			amount: Joi.number().required(),
			country: Joi.string().required(),
			city: Joi.string().required(),
			work: Joi.string().required(),

			// beck end stuff
			orderId: Joi.string().required(),
			paid:Joi.boolean().required()
	});


module.exports = { RequestClientSchema, SaveClientSchema};

// Return result.
// const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
// Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid