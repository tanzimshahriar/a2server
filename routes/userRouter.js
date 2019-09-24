const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const randomstring = require('randomstring');

const registerSchema = {
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required()
}
const loginSchema = {
  email: Joi.string().required().email(),
  password: Joi.string().required()
}

userRouter.post('/register', async (req, res) => {
  try {
    const validationError = Joi.validate(req.body, registerSchema);
    if (validationError.error) {
      return res.status(400).json({
        msg: validationError.error.details[0].message,
        errorCode: "VALIDATION_ERROR"
      })
    }
    //password is hashed
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
    //generate secret token
    const secretToken = randomstring.generate();

    const user = {
      email: req.body.email,
      password: hashedPassword,
      secretToken: secretToken,
    }
    connection.query('INSERT INTO users SET ?', user,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.status(400).json({errorCode: error.code, msg:'Failed to register user'});
        } else {
          res.status(200).json({
            msg: 'Signup Successful for ' + (req.body.email), 
            result: "Success"
          })
        }
      })

  } catch {
    res.status(500).json({msg:"failed to register user"});
  }
});

userRouter.post('/login', (req, res) => {
  const validationError = Joi.validate(req.body, loginSchema);
    if (validationError.error) {
      return res.status(400).json({
        msg: validationError.error.details[0].message,
        errorCode: "VALIDATION_ERROR"
      })
    }
  connection.query("SELECT email, password, type, status FROM users WHERE email = ?", req.body.email,
    async function (error, result, fields) {
      try {
        if (Object.keys(result).length !== 1) {
          //query doesn't find any user
          res.status(400).json({msg: "No user found", errorCode: "USER_NOT_FOUND"});
        }
        else {
          if (await bcrypt.compare(req.body.password, result[0].password)) {
            if(result[0].status) {
              const token = jwt.sign({_id: req.body.email},process.env.TOKEN_SECRET);
              console.log(result[0]);
              res.header('auth-token', token).json({
                token: token,
                msg: "Logged in Successfully",
                result: "Success",
                userType: result[0].type,
              });
            }
            else {
              res.json({
                msg: "Please verify your email first",
                result: "Unverified",
                userType: result[0].type,
              });
            }
            
          } else {
            res.status(401).json({msg: "Incorrect password or email",  errorCode: "WRONG_PASSWORD"});
          }
        }
      } catch {
        res.status(400).json({msg: "Login failed. Please try again",  errorCode: "UNKNOWN_ERROR"});
      }

    });

});

userRouter.post('/verify', (req, res) => {
  connection.query("SELECT email, status, secretToken FROM users WHERE secretToken = ?", req.body.secretToken,
  (error, result, field) => {
    if (error) {
      console.log(error);
      res.status(400).json({error: error, msg: "Invalid confirmation code", errorCode: "Invalid"});
    }
    else if (Object.keys(result).length !== 1) {
      //query doesn't find any user
      res.status(400).json({msg: "No user found", errorCode: "USER_NOT_FOUND"});
    }
    else if (Object.keys(result).length == 1 && result.secretToken == req.body.secretToken) {
      result.status = true;
      res.status(200).json({msg: (result.email+" has been verified"), result: "Success"})
    }
    else {
      res.status(400).json({msg: "Invalid code, not verified", errorCode: "Invalid"})
    }
  });
});


module.exports = userRouter