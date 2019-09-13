'use strict';
require('dotenv').config();
var connection = require('../database');
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//insert user to database
async function registerUser(email, password) {
  
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
    } else {
      return value;
    }
  })
], async (req, res) => {
    try { 
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            res.send(errors);
        } else {
          //password is hashed before storing in database
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(req.body.password,salt)
          const user = {
            email: req.body.email,
            password: hashedPassword
          }
          connection.query('INSERT INTO users SET ?', user, 
          function(error, results){
            if (error) {
              console.error('An error occurred while executing the query')
              res
              .status(500)
              .send("User not added. Server Error")
              .end();
            } else {
              res
              .status(200)
              .send(req.body.email+' added to users table')
              .end(); 
            }
            console.log(results);
          })
        }
    } catch {
        res.status(500).send("FAILED");
    }
});

module.exports = userRouter