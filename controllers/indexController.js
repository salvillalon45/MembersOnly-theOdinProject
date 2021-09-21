const Message = require('../models/message');
const message_controller = require('./messageController');
const cardUtils = require('../util/cardUtils');

exports.index = async function (req, res, next) {
	console.log('Going to render index page');
	let messages = await message_controller.messages_get(req, res, next);
	console.log('Messages in HOme');
	let user = null;
	// if (req.user ?? ) {
	// 	user
	// }
	console.log('What is req.user');
	console.log(req.user);
	const { currentUser } = res.locals;
	// helper.formatDate(message.timestamp)
	console.log('What is currentUser');
	console.log(currentUser);
	res.render('index', {
		messages: messages,
		user: req.user,
		cardUtils: cardUtils
	});
};

// exports.home = async function (req, res, next) {
// 	console.log('Going to home index page');
// 	let messages = await message_controller.messages_get(req, res, next);
// 	console.log('Messages in HOme');
// 	console.log(req.user);
// 	res.render('home', { messages: messages, user: req.user });
// };
