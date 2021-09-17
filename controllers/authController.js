const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// GET Sign UP
exports.sign_up_get = function (req, res, next) {
	res.render('sign_up_form', { errors: null });
};

// POST Sign Up
exports.sign_up_post = [
	body('username')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Username must be at least 6 characters'),
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('First name cannot be empty'),
	body('last_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Last name cannot be empty'),
	body('password')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Confirm Password must be at least 6 characters'),
	body('confirmPassword')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Password must be at least 6 characters')
		.custom(async function (value, { req }) {
			// Use the custom method w/ a CB func to ensure that both passwords match, return an error if so
			if (value !== req.body.password) {
				throw new Error('Passwords must be the same');
			}

			return true;
		}),

	async function (req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('SIGN UP: Error with fields');
			console.log(errors);
			return res.render('sign_up_form', { errors: errors.array() });
		}

		try {
			const isUserInDB = await User.find({ username: req.body.username });
			if (isUserInDB.length > 0) {
				return res.render('sign_up_form', {
					errors: [{ msg: 'User already exists' }]
				});
			}

			// If username does not exist, continue to register new user to DB
			bcrypt.hash(
				req.body.password,
				10,
				async function (err, hashedPassword) {
					try {
						const user = new User({
							username: req.body.username,
							password: hashedPassword,
							membership_status: false,
							last_name: req.body.last_name,
							first_name: req.body.first_name
						});
						let result = await user.save();
						console.log('What is save user');
						console.log(result);
						res.redirect('/home');
					} catch (err) {
						console.log(
							'SIGN UP: Error while trying to save new user in db'
						);
						return next(err);
					}
				}
			);
		} catch (err) {
			console.log('SIGN UP: Error while trying to find user in db');
			return next(err);
		}
	}
];

// GET Log In
exports.log_in_get = function (req, res, next) {
	console.log(req);
	res.render('log_in_form', { message: null });
};

// POST Log In
exports.log_in_post = passport.authenticate(
	'local',
	{
		successRedirect: '/home',
		failureRedirect: '/log-in'
		// failureFlash: true
	}
	// (err, user, options) => {
	// 	console.log('What are option');
	// 	console.log(options); // options will be the complete object you pass in done()
	// }
);

// GET Log Out
exports.log_out_get = function (req, res, next) {
	req.logout();
	res.redirect('/');
};
