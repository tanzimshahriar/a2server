const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/user/cart', verify, (req, res) => {
    res.json({
        cartItems:
        {
            item: 'item1'
        }
    })
})


router.post('/user/verifyuser', verify, (req, res) => {

    connection.query("SELECT email, status, secretToken FROM users WHERE email =?", req.user.email,
        function (error, result, fields) {

            if (Object.keys(result).length == 1 && result[0].secretToken == req.body.secretToken) {

                connection.query("UPDATE users set status = true WHERE email =?",req.user.email, function (err,res,fie){
                    if(error){
                        res.status(400).json({
                            msg: "Error updating status, sql update failed", error : error, errorCode: "SQL_UPDATE_ERROR"
                        })
                    }
                })
        
                res.status(200).json({ msg: (result[0].email + " has been verified"), result: "Success" })
            }
            else {
                res.status(400).json({ msg: "Invalid code, not verified", errorCode: "Invalid" })
            }
        })
})

router.get('/user/getverificationstatus', verify, (req, res) => {
        connection.query("SELECT email, status FROM users WHERE email =?", req.user.email,
        function (error, result, fields) {
            if(error){
                res.status(400).json({
                    "msg": "Failed to see verification status",
                    "ErrorCode": error.errorCode
                })
            }
            if (result[0].status) {
                res.status(200).json({
                    "result": "Verified",
                    "email": req.user.email
                })
            }
            else {
                res.status(200).json({
                    "result": "unverified",
                    "email": req.user.email
                })
            }
            
        })
})

router.get('/user/getUserPurchases', verify, (req, res) => {
    res.status(200).json({
        result: "nothing" 
    })
})
module.exports = router;