const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.all('*',(req,res)=>{
    res.status(404).json({
        message : "path not found !!!"
    })
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.statusCode).json({
        message : err.message,
        status : err.status,
        stack : err.stack
    })
});

module.exports = app;