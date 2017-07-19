//import routes
const express = require('express');
const router = express.Router();

//include data file
const { data } = require('../data/flashcardData.json');
//equiv to data = require(...).data;
const { cards } = data; //equiv to cards = data.cards

//because of how the middleware is set up in app.js
//all traffic defaults to /routes/cards
//so, the root route is already /routes/cards(.js)
router.get('/', (req, res) => {
	res.locals.prompt = cards[0].question;
	res.locals.hint = cards[0].hint;
	res.render('card');
});

module.exports = router;