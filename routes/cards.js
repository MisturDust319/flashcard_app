//import routes
const express = require('express');
const router = express.Router();

//include data file
const { data } = require('../data/flashcardData.json');
//equiv to data = require(...).data;
const { cards } = data; //equiv to cards = data.cards

//if given a plain route, give a random card
//
router.get('/', (req, res) => {
	const id = Math.floor(Math.random() * (cards.length - 1));
	res.redirect(`/cards/${id}?side=question`);
});

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
		text, id
	};
	//templateData.text = text
	
	//get the flip side data
	templateData.flipSide = (side === 'question') ? 'answer' : 'question';


	if(side === "question") {
		templateData.hint = hint;
	}

	res.render('card', templateData);
});



module.exports = router;