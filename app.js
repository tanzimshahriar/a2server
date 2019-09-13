'use strict';
require('dotenv').config();
var connection = require('./database');
const express = require('express');
const app = express();
var bodyParser = require ('body-parser');

// set up global middleware
// Parse incoming requests data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//set and use routers
const userRouter = require('./routes/userRouter.js');
app.use(userRouter);


//ITS WORKING:
// app.get('/', (req, res, next) => {
//   connection.query('select * from users', 
//   function(err, result, fields){
//     if (err){
//       console.log("fucken error");
//       throw err;
//     } 
//     console.log("GET RESULTTTTTTTTT and thread id is :"+connection.threadId);
//     res
//     .status(200)
//     .json(result)
//     .end();
//   });
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;