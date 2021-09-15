const User = require('../models/user');
const passport = require('passport');

// GET Sign UP
exports.sign_up_get = function (req, res, next) {
	res.render('sign_up_form');
};

// POST Sign Up
exports.sign_up_post = async function (req, res, next) {
	try {
		const user = new User({
			username: req.body.username,
			password: req.body.password,
			membership_status: true,
			last_name: req.body.last_name,
			first_name: req.body.first_name
		});
		let result = await user.save();
		console.log('What is save user');
		console.log(result);
		res.redirect('/home');
	} catch (err) {
		return next(err);
	}
};

// GET Log In
exports.log_in_get = function (req, res, next) {
	res.render('log_in_form');
};

// POST Log In
exports.log_in_post = passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/log-in'
});

// GET Log Out
exports.log_out_get = function (req, res, next) {
	req.logout();
	res.redirect('/');
};
