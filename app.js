const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const localStrategySetup = require('./util/authSetup');
const serializeUserSetUp = require('./util/authSetup');
const deserializeUserSetUp = require('./util/authSetup');
const storeCurrentUser = require('./util/authSetup');
require('dotenv').config();
const User = require('./models/user');

const indexRouter = require('./routes/routes');

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || process.env.DEV_MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.use(
	new LocalStrategy({ passReqToCallback: true }, async function (
		username,
		password,
		done
	) {
		try {
			console.log('Going to be inside LocalStrategy');
			let foundUser = await User.findOne({
				username: username
			});

			console.log('What is foundUser');
			console.log(foundUser);

			if (!foundUser) {
				console.log('User is not found! ');
				return done(null, false, { message: 'Incorrect username' });
			}

			bcrypt.compare(
				password,
				foundUser.password,
				async function (err, res) {
					if (res) {
						// passwords match. Log user in
						console.log('password do match!');
						return done(null, foundUser);
					} else {
						// password do not match!
						console.log('password do not match!');
						return done(null, false, {
							message: 'Incorrect password'
						});
					}
				}
			);
			console.log('DONE FUNCT');
			return done(null, foundUser);
		} catch (err) {
			console.log('There is an error, return done');
			return done(err);
		}
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

app.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	sassMiddleware({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		indentedSyntax: false, // true = .sass and false = .scss
		sourceMap: true
	})
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
