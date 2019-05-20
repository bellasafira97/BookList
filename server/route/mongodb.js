var router = require('express').Router();
var mongoose = require('mongoose');
var url = 
'mongodb://bellas:1234@localhost:27017/test'

mongoose.connect(url, ()=>{
    console.log('Terhubung ke MongoDB')
})

module.exports = router;



