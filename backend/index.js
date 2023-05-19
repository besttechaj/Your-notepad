//backend api calls...
const express = require('express');
const app = express();

//requiring database
const connectToMongo = require('./db');
connectToMongo();
const port = process.env.PORT || 5000;

//you need a middleware -> whenever you are sending some custom data via api and you want console that from api using req.body ie. console.log(req.body)
app.use(express.json());

//Available routes

//for user's data
app.use('/api/auth', require('./routes/auth'));

//for user's notes
app.use('/api/notes', require('./routes/notes'));

app.listen(port, (err) => {
  console.log('listening server at port' + port);
});
