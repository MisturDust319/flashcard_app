//import routes
const express = require('express');
const router = express.Router();

//this is the routing setup for node/express
//args
// 1: the route to respond to
// 2: a callback with request and response args
router.get('/', (req, res) => {
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

router.post('/goodbye', (req, res) => {
	//clear username cookie
	res.clearCookie('username');
	//go to login page at route /hello
	//
	res.redirect('/hello');
});

router.get('/hello', (req, res) => {
	const name = req.cookies.username;

	if(name)
		res.redirect('/');
	else
		res.render('hello');
});

//this is for when posting to form
router.post('/hello', (req, res) => {
	//note since name would be passed as an obj prop
	//	'name', you can ES6 shorthand of just { name }=> {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

module.exports = router;