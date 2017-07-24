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
//

//import routes from sub folder
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
//use the routes
app.use(mainRoutes);
app.use('/cards', cardRoutes);


//this is the 404 event handler
//it triggers when a web page can't be found
app.use((req, res, next) => {
	//console.log("404 error");
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/*
app.use((err, req, res, next) => {
	res.locals.error = err;
	//set response status to whatever err.status is
	res.status(err.status);
	res.render('error');
	//pass error data to the template as err
});
*/
app.listen(3000, () => {
    console.log("The app is runnin on port 3000");
});
//set app to listen on port 3000 for web requests
