const Message = require('../models/message');
const message_controller = require('./messageController');

exports.index = function (req, res) {
	console.log('Going to render index page');
	res.render('index', { user: req.user });
};

exports.home = async function (req, res, next) {
	console.log('Going to home index page');
	let messages = await message_controller.messages_get(req, res, next);
	console.log('Messages in HOme');
	console.log(messages);
	console.log(req.user);
	res.render('home', { messages: messages, user: req.user });
};
