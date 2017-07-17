const express = require('express');
//include express
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
//create a simple express app
//
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');
//set pug as the templating engine.
//it will now look for templates in the views folder
//\

app.use((req, res, next) => {
	req.message = "A message to you, Rudy";
	next();
});

app.use((req, res, next) => {
	console.log(req.message);
	const err = new Error('Oh noes!');
	err.status = 500;
	//set error status to 500
	next(err);
});

//this is the routing setup for node/express
//args
// 1: the route to respond to
// 2: a callback with request and response args
app.get('/', (req, res) => {
	//note since name would be passed as an obj prop
	//	'name', you can ES6 shorthand of just { name }
	const name = req.cookies.username;
	//if name cookie defined, go to index
	//otherwise...
	if(name) {
		res.render('index',
	  		{ name });
	}
	//redirect to login
	else {
		res.redirect('/hello');
	}
});

app.post('/goodbye', (req, res) => {
	//clear username cookie
	res.clearCookie('username');
	//go to login page at route /hello
	//
	res.redirect('/hello');
})

app.get('/hello', (req, res) => {
	const name = req.cookies.username;

	if(name)
		res.redirect('/');
	else
		res.render('hello');
});

//this is for when posting to form
app.post('/hello', (req, res) => {
	//note since name would be passed as an obj prop
	//	'name', you can ES6 shorthand of just { name }=> {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

app.get('/cards', (req, res) => {
	res.locals.prompt = "Whose buried in Grant's Tomb?";
	res.locals.hint = "Think about whose tomb it is.";
	res.render('card');
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	//set response status to whatever err.status is
	res.status(err.status);
	res.render('error');
	//pass error data to the template as err
})

app.listen(3000, () => {
           console.log("The app is runnin on port 3000");
});
//set app to listen on port 3000 for web requests
