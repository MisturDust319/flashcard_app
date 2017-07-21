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
//the :id allows the value trailing after the route
//	to be treated like a var, stored in req.params obj
router.get('/:id', (req, res) => {
	const {side} = req.query;
	const {id} = req.params;
	const text = cards[id][side];
	const {hint} = cards[id];
	const templateData = {
		text, hint, side
	};
	//templateData.text = text
	//templateData.hint = hint
	//
	res.render('card', templateData);
});

module.exports = router;