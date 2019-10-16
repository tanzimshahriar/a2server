'use strict';
require('dotenv').config();
const cors = require('cors');
var connection = require('./database');
const express = require('express');
const app = express();
var bodyParser = require ('body-parser');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// set up global middlewares
if (process.env.NODE_ENV=="production") {
  const allowedCorsSites = {
    origin: "https://assignment-two-app.appspot.com"
  }
  app.use(cors(allowedCorsSites));
}
else {
  app.use(cors())
}

const productsRouter = require('./routes/productsRouter.js');
const userRouter = require('./routes/userRouter.js');
const userInfo = require('./routes/LoggedInUser/customerRouter.js');
app.use(connection);
app.use(productsRouter);
app.use(userRouter);
app.use(userInfo);


app.get('/', (req, res, next) => {
  res.send("THIS IS THE API")
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  if(process.env.NODE_ENV==='production'){
    console.log('Server started');
  }
  else{
    console.log(`App listening on port ${PORT}`);
  }
});

module.exports = app;