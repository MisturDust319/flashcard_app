const express = require('express');
//include express

const app = express();
//create a simple express app

app.set('view engine', 'pug');
//set pug as the templating engine.
//it will now look for templates in the views folder

//this is the routing setup for node/express
//args
// 1: the route to respond to
// 2: a callback with request and response args
app.get('/', (req, res) => {
  res.send('<h1>Sup!</h1>');
});

app.get('/hello', (req, res) => {
  res.render('hello');
});

//this is for when posting to form
app.post('/hello', (req, res) => {
	console.dir(req);
	res.render('hello');
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
