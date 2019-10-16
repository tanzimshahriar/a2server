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
            } catch {
                res.status(400).json({
                    "msg": "Failed to fetch products",
                    "ErrorCode": "SQL_ERROR",
                })
            }
        })

})

productsRouter.post('/purchaseitems', (req, res) => {
    //connection.query('INSERT INTO users SET ?', user,
    var datetime = require('node-datetime');
    var errors = [];
    var dt = datetime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    const purchaseid= -1;
    const quanitity = -1;
    console.log(req.body.items)
    const purchase = {
        email: req.body.email,
        items: req.body.items,
        datetime: formatted
    }
    console.log(purchase)
    connection.query("INSERT into purchases SET ?", purchase,
        function (error, results, fields) {
            if(!error){
                errors.push(error)
            }
        })
    // connection.query("SELECT @@id from purchases", function (error, results, fields) {
    //     if(!(error || errors)) {
    //         errors.push(error)
    //     } else {
    //         purchaseid = results.id;
    //         quanitity = results.quanitity-1;
    //         console.log(purchaseid)
    //     }
    // })
    // connection.query("Update products Set quantity=? Where id=?", [quanitity,purchaseid],function (error, results, fields) {
    //     if(!(error || errors)) {
    //         errors.push(error)
    //     } else {
    //         purchaseid = results[0].id
    //         console.log(purchaseid)
    //     }
    // })
    if(errors.length>0){
        res.status(400).json({
            result: "Failed",
            errors: errors
        })
    }
    else {
        res.status(200).json({
            result: "Success",
            msg: "Purchase Successful",
        })
    }
    

})

module.exports = productsRouter