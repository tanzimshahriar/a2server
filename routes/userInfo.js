const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/usercart', verify ,(req,res) => {
    res.json({
        cartItems: 
        {
            item:'item1'
        }
    })
})
module.exports = router;