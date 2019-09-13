//var mysql = require('mysql');
var express = require('express');
const register = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
const {BigQuery} = require('@google-cloud/bigquery');

async function registerUser(email, password) {
  console.log('username added');
  const datasetId = 'bigquery_a2_dataset';
  const tableId = 'users';
  const row = [{email: email, password: password}];

  // Create a client
  const bigqueryClient = new BigQuery();

  // Insert user data into users table
  await bigqueryClient
    .dataset(datasetId)
    .table(tableId)
    .insert(row);
  console.log(`Inserted ${row.length} rows`);
}


  
  // Register Proccess
  register.post('/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
  
    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
    let errors = req.validationErrors();
  
    if(errors){
      console.log("error");
    } else {
      registerUser(email, password);
      // let newUser = new User({
      //   name:name,
      //   email:email,
      //   password:password
      // });
  
      // bcrypt.genSalt(10, function(err, salt){
      //   bcrypt.hash(newUser.password, salt, function(err, hash){
      //     if(err){
      //       console.log(err);
      //     }
      //     newUser.password = hash;
      //     newUser.save(function(err){
      //       if(err){
      //         console.log(err);
      //         return;
      //       } else {
      //         req.flash('success','You are now registered and can log in');
      //         res.redirect('/users/login');
      //       }
      //     });
      //   });
      // });
    }
  });

  module.exports=register;