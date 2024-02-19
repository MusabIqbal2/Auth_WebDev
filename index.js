var createError=require('http-errors');
var express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));


(async () => {
    try{
        await mongoose.connect('mongodb+srv://musabiqbal2:FXD901v82IcOnGYA@cluster0.wyou3sp.mongodb.net/')
        console.log("server connection established successfully.");
    }catch(error){
        console.error('unable to connect to the database:', error);
    }
})()

const router= require('./routes/index');
app.use('/',router);

app.use(function(req,res,next){
    next(createError(404));
})

const PORT=3000;
app.listen(PORT, console.log(`server running on port ${PORT}`));