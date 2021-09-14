// GET Sign UP
exports.sign_up_get = function (req, res, next) {
	res.render('sign-up-form');
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

		res.redirect('/');
	} catch (err) {
		return next(err);
	}
};
