const express = require('express');
const { check, validationResult } = require('express-validator');

//setup bigquery datastore
const {BigQuery} = require('@google-cloud/bigquery');
async function registerUser(email, password) {
  const datasetId = 'bigquery_a2_dataset';
  const tableId = 'users';
  const row = [{email: email, password: password}];

  // Create a client
  const bigqueryClient = new BigQuery();

  // Insert user data into users table
  await bigqueryClient
    .dataset(datasetId)
    .table(tableId)
    .insert(row)
    .end();
}

const userRouter = express.Router();

userRouter.post('/register', [
  check('email').not().isEmpty().withMessage('email is required.'),
  check('email').isEmail(),
  check('password').not().isEmpty().withMessage('password is required.'),
  check('password2').custom((value,{req, loc, path}) => {
    if(value !==req.body.password){
      //throw error that password2 doesn't match
      throw new Error("password2 doesn't match password")
    }
    else{
      return value;
    }
  })
], function(req, res){
  const email = req.body.email;
  const password = req.body.password;  
  let errors = validationResult(req);
  
    if(!errors.isEmpty()){
      console.log(errors);
      res.send(errors);
    } else {
      try {
        registerUser(email, password);
        res
        .status(200)
        .send(email+' added to users table')
        .end();
    } catch (error) {
        console.error(error);
        res.send(error);
    }
    }
});

module.exports = userRouter