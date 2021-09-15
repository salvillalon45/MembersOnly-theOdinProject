exports.index = function (req, res) {
	console.log('Going to render index page');
	res.render('index', { user: req.user });
};

exports.home = function (req, res) {
	console.log('Going to home index page');
	res.render('home', { user: req.user });
};
