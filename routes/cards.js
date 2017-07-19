//import routes
const express = require('express');
const router = express.Router();

//because of how the middleware is set up in app.js
//all traffic defaults to /routes/cards
//so, the root route is already /routes/cards(.js)
router.get('/', (req, res) => {
	res.locals.prompt = "Whose buried in Grant's Tomb?";
	res.locals.hint = "Think about whose tomb it is.";
	res.render('card');
});

module.exports = router;