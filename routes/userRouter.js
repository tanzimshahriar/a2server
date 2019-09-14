var connection = require('../database');
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.post('/register', [
  check('email').not().isEmpty().withMessage('email is required.'),
  check('email').isEmail(),
  check('password').not().isEmpty().withMessage('password is required.'),
  check('password2').custom((value, { req, loc, path }) => {
    if (value !== req.body.password) {
      //throw error that password2 doesn't match
      throw new Error("password2 doesn't match password")
    } else {
      return value;
    }
  })
], async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      //password is hashed before storing in database
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const user = {
        email: req.body.email,
        password: hashedPassword
      }
      // connection.query('INSERT INTO users(email,password) VALUES(?,?) ', user, 
      connection.query('INSERT INTO users SET ?', user,
        function (error, results, fields) {
          if (error) {
            res
              .status(400)
              .send(error.code)
          } else {
            res
              .status(200)
              .send(req.body.email + ' added to users table')
          }
        })
    }
  } catch {
    res.status(500).send("FAILED");
  }
});

userRouter.post('/login',
  [
    check('email').not().isEmpty().withMessage('email is required.'),
    check('email').isEmail(),
    check('password').not().isEmpty().withMessage('password is required.')
  ], (req, res) => {
      let valErrors = validationResult(req);
      if (!valErrors.isEmpty()) {
        //Invalid user input
        res.send(valErrors);
      } else {
      connection.query("SELECT email, password FROM users WHERE email = ?", req.body.email,
        async function (error, result, fields) {
          try{
            if (Object.keys(result).length!==1) {
              let error = {
                value: req.body.email,
                msg: "No user Exists",
                param: "email",
                location: "body"
              }
              //query doesn't find any user
              res.status(401).send(error);
            }
            else {
              if (await bcrypt.compare(req.body.password, result[0].password)){
                res.status(200).send('Success');
              } else {
                let error = {
                  value: "hidden",
                  msg: "Wrong Password",
                  param: "password",
                  location: "body"
                }
                res.status(401).send(error);
              }      
            }
          } catch {
            console.log(error);
            res.status(400).send(error)
          }
          
        });
    }
  });


module.exports = userRouter