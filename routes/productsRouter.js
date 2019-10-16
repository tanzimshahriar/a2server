const express = require('express');
const Joi = require('joi');
const productsRouter = express.Router();

productsRouter.get('/getproducts', (req, res) => {

    connection.query("SELECT name, description, imagesrc, price, quantity FROM products",
        async function (error, results, fields) {
            try {
                
                var products = []
                
                for (var i = 0; i < results.length; i++) {
                    
                    products.push(results[i])
                }

                res.status(200).json({
                    "msg": "Success",
                    "products": products
                }) 
            }
            catch {
                res.status(400).json({
                    "msg": "Failed to fetch products",
                    "ErrorCode": "SQL_ERROR",
                })
            }
        })
                
})

productsRouter.post('/purchaseItems', async (req, res) => {
    try {
    //   const user = {
    //     email: req.body.email,
    //     password: hashedPassword,
    //     secretToken: secretToken,
    //   }
    //   connection.query('INSERT INTO users SET ?', user,
    //     async function (error, results, fields) {
    //         res.status(200).json({
    //           result: "Success"
    //         })
    //     })
        
        res.status(200).json({
            result: "Success"
        })
    } catch {
      res.status(500).json({msg:"failed to purchase"});
    }
  });

module.exports = productsRouter