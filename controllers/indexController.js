const message_controller = require('./messageController');
const cardUtils = require('../util/cardUtils');

exports.index = async function (req, res, next) {
	let messages = await message_controller.messages_get(req, res, next);

	res.render('index', {
		messages: messages,
		user: req.user,
		cardUtils: cardUtils
	});
};
