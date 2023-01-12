# Members Only
[The Odin Project: Node] - Project: Members Only

## Intro

-   In this project, I practice how to use authentication using PassportJs and practice our db skill further
-   Also based on the status of the user, they will get to see certain content, but when they sign up for an account they will get to see everything!
-   Also, the user can become an admin to delete messages and a member to see the content of messages
-   You can find more on the project here: [The Odin Project - Members Only](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only)

### 📗 Fonts used

-   [Playfair Display by Claus Eggers Sørensen](https://fonts.google.com/specimen/Playfair+Display?query=playfair)
-   [Roboto by Christian Robertson](https://fonts.google.com/specimen/Roboto?query=robot)

### 🎨 Color Reference

|  Color            |  Hex                                                                 |
| ----------------- | -------------------------------------------------------------------- |
|  Light Brown      |  ![#ffeccf](https://placehold.co/15x15/ffeccf/ffeccf.png) `#ffeccf`  |
|  White            |  ![#fff](https://placehold.co/15x15/fff/fff.png) `#fff`              |
|  Black            |  ![#1e1c1c](https://placehold.co/15x15/1e1c1c/1e1c1c.png) `#1e1c1c`  |

-   Saw online for [Attack on Titan Color Scheme and found this](https://www.color-hex.com/color-palette/29356). I got inspiration from it.

## Overall & Next Steps

-   Last project I promised myself to practice using async/await! I am glad I did this promise since using async and await made the code organize and easier to understand!
-   I am proud how the organization of the routes and controllers directory came to be I felt this was better organize than what I had for the previous project. Thanks to this [fellow developer: s92xiong/jojo-club](https://github.com/s92xiong/jojo-club)
-   One challenge was that in the message model I made a reference to the user model. When I was tryugn to retrieve the user data, I was not able to. That is when I found the populate function. All I had to do was this line of code. This populate the user_id reference I had with the actual content!

```
let messages = await Message.find().populate('user_id');
```

-   Also, I learned that if you want to use images in the app, you just have to include it in the images folder and call the image as so. Also I had not idea I could use gifs in a website! First time using a gif!

```
<img
	src="/images/admin.gif"
/>
```

-   This is possible since in the app.js we have this line of code that exposes the public folder

```
app.use(express.static(path.join(__dirname, 'public')));
```

-   Also, I learned how to use Flash() to get the error message when the user logs in. In the `log_in_post` I included failureFlash then in `log_in_get` I find the error. You also have to install the connect-flash package then add it to the middleware in app.js

```
exports.log_in_get = function (req, res, next) {
	let message = null;
	const flashResult = req.flash();

	if (Object.keys(flashResult).length !== 0) {
		message = flashResult.error[0];
	}

	res.render('forms/log_in_form', { message: message });
};

exports.log_in_post = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/log-in',
	failureFlash: true
});
```

-   Also to make express app project easier, I create a .txt that serves as guide to help me set up the project. This will make the process easier for next time I need to set up a project.

## Technologies:

-   Node
-   Sass
-   Heroku
-   Express
-   Passport JS
-   EJS
