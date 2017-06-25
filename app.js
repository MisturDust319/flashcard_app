const express = require('express');
//include express

const app = express();
//create a simple express app

//this is the routing setup for node/express
//args
// 1: the route to respond to
// 2: a callback with request and response args
app.get('/', (request, response) => {
  response.send('sup!');
});

app.listen(3000);
//set app to listen on port 3000 for web requests
