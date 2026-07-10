const express = require('express');
const router = express.Router();

const {home} = require('../controller/homeCont');

router.get('/',(req,res)=>{
    res.send('home')
});

module.exports = router;