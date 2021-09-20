const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.messages_get = async function (req, res, next) {
	console.log('INside messages_get');
	try {
		const { currentUser } = res.locals;

		let messages = await Message.find({ id: currentUser._id });
		console.log('what are messages');
		console.log(messages);
		// res.render('home', { messages: messages });
		return messages;
	} catch (err) {
		console.log('MESSAGES GET: Error retrieving messages');
		console.log(err);

		return null;
	}
};

exports.create_message_get = function (req, res, next) {
	res.render('create_message_form', { errors: null });
};

exports.create_message_post = [
	body('message_title')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Message title must not be empty'),
	body('message_content')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Message content must not be empty'),
	async function (req, res, next) {
		const { currentUser } = res.locals;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('CREATE MESSAGE: Error with fields');
			console.log(errors);
			return res.render('create_message_form', {
				errors: errors.array(),
				user: res.locals.currentUser
			});
		}

		try {
			const newMessage = new Message({
				title: req.body.message_title,
				timestamp: new Date(),
				message_content: req.body.message_content,
				user_id: currentUser._id
			});

			let result = await newMessage.save();
			console.log('What is save message');
			console.log(result);
			res.redirect('/home');
		} catch (err) {
			console.log('CREATE MESSAGE: Error while trying to save in db');
			return next(err);
		}
	}
];
