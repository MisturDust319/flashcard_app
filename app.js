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

app.get('/hello', (req, res) => {
  res.render('hello');
});

//this is for when posting to form
app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

app.get('/cards', (req, res) => {
	res.locals.prompt = "Whose buried in Grant's Tomb?";
	res.locals.hint = "Think about whose tomb it is.";
	res.render('card');
});

app.listen(3000, () => {
           console.log("The app is runnin on port 3000");
});
//set app to listen on port 3000 for web requests
