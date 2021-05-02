const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const utf8 = require('utf8')
const path = require('path')
const jsonWebToken = require('jsonwebtoken')
const bodyParser = require('body-parser')
require('dotenv').config()

//import routes
const getUserData = require('./routes/getUserDataHelper.js')
const postUserData = require('./routes/postUserDataHelper.js')

//uses for app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//GETs
app.get('/records', function (req, res) {
    res.sendFile(path.join(__dirname, './public/views/user-records.html'))
});
 const username="a";
app.post('/getRecords', function(req,res){
    getUserData(username,req)
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
        res.send({Success:false, Message:err})
    })
    })
//POSTs
    app.post('/postRecords', function(req,res){
        postUserData(username,req.body)
        .then(()=>{
           res.send({Success:true})
        })
        .catch(err=>{
            console.log(err)
            res.send({Success:false, Message:err})
        })
        })

    //The port the app is running on 
app.listen(8082, () => {
    console.log('Server is running on port 8082...');
});