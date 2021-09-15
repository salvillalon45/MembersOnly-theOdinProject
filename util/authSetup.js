module.exports = function storeCurrentUser(req, res, next) {
	res.locals.currentUser = req.user;
	next();
};

module.exports = function serializeUserSetUp(user, done) {
	done(null, user.id);
};

module.exports = function deserializeUserSetUp(id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
};

module.exports = async function localStrategySetup(username, password, done) {
	try {
		let foundUser = await User.findOne({
			username: username
		});

		console.log('What is foundUser');
		console.log(foundUser);

		if (!foundUser) {
			return done(null, false, { message: 'Incorrect username' });
		}

		bcrypt.compare(password, foundUser.password, async function (err, res) {
			if (res) {
				// passwords match. Log user in
				return done(null, foundUser);
			} else {
				// password do not match!
				return done(null, false, {
					message: 'Incorrect password'
				});
			}
		});

		return done(null, foundUser);
	} catch (err) {
		console.log('There is an error, return done');
		return done(err);
	}
};
