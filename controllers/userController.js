const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

// GET Member Sign IN
exports.member_sign_in_get = function (req, res, next) {
	console.log(';What is currentUser');
	console.log(res.locals.currentUser);

	if (!res.locals.currentUser) {
		res.redirect('/log-in');
	}

	res.render('member_sign_in_form', { errors: null });
};

// POST Member Sign IN
exports.member_sign_in_post = [
	body('secret_code')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('secret_code must not be empty characters'),
	async function (req, res, next) {
		const { currentUser } = res.locals;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('SECRET MEMBER SIGN UP: Error with fields');
			console.log(errors);
			return res.render('member_sign_in_form', {
                errors: errors.array(),
                user: res.locals.currentUser
			});
		} else if (req.body.secret_code !== process.env.secret_code) {
			console.log('SECRET MEMBER SIGN UP: Not Correct Secret Code');
			console.log(errors);
			return res.render('member_sign_in_form', {
                errors: [{ msg: 'Wrong Secret Code' }],
                user: res.locals.currentUser
			});
		}

		try {
			const isUserInDB = await User.findById(currentUser._id);
			console.log(isUserInDB);
			// 6143707c1258e3c6e6d8e3a6
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
