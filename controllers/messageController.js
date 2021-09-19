const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.create_message_get = function (req, res, next) {
	res.render('create_message_form', { errors: null });
};

exports.create_message_post = [
	body('user_message')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Message must not be empty'),
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
			const isUserInDB = await Message.findById(currentUser._id);
			console.log(isUserInDB);
			if (isUserInDB.membership_status) {
				console.log('SECRET MEMBER SIGN UP: User is already a member');
				return res.render('member_sign_in_form', {
					errors: [{ msg: 'User is already a member' }],
					user: res.locals.currentUser
				});
			}
			console.log('GOig to update membership_status');
			const userToUpdate = new User(currentUser);
			userToUpdate.membership_status = true;

			// If username does not exist, continue to update
			User.findByIdAndUpdate(
				currentUser._id,
				userToUpdate,
				{},
				function (err) {
					if (err) {
						return next(err);
					}

					res.redirect('/home');
				}
			);
		} catch (err) {
			console.log(
				'SECRET MEMBER SIGN UP: Error while trying to find user in db'
			);
			return next(err);
		}
	}
];
