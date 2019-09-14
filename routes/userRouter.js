const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

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
        msg: validationError.error.details[0].message
      })
    }
    //password is hashed before storing in database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = {
      email: req.body.email,
      password: hashedPassword
    }
    connection.query('INSERT INTO users SET ?', user,
      function (error, results, fields) {
        if (error) {
          res.status(400).json({ErrorCode: error.code,msg:'Failed to register user'});
        } else {
          res.status(200).json({msg: (req.body.email + ' added to users table')})
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
        msg: validationError.error.details[0].message
      })
    }
  connection.query("SELECT email, password FROM users WHERE email = ?", req.body.email,
    async function (error, result, fields) {
      try {
        if (Object.keys(result).length !== 1) {
          let error = {
            value: req.body.email,
            msg: "Email not found",
            param: "email",
            location: "body"
          }
          //query doesn't find any user
          res.status(401).json({error});
        }
        else {
          if (await bcrypt.compare(req.body.password, result[0].password)) {
            const token = jwt.sign({_id: req.body.email},process.env.TOKEN_SECRET);
            res.header('auth-token',token).send(token);
            res.status(200).json({msg: 'Logged in!',token});
          } else {
            let error = {
              value: "hidden",
              msg: "Wrong Password",
              param: "password",
              location: "body"
            }
            res.status(401).json({error});
          }
        }
      } catch {
        console.log(error);
        res.status(400).json({error});
      }

    });

});


module.exports = userRouter