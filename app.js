'use strict';
require('dotenv').config();
const cors = require('cors');
var connection = require('./database');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
var bodyParser = require ('body-parser');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// set up global middleware
const allowedCorsSites = {
  origin: "https://assignment-two-app.appspot.com"
}
app.use(cors(allowedCorsSites));
const userRouter = require('./routes/userRouter.js');
const userInfo = require('./routes/userInfo.js');
app.use(connection);
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