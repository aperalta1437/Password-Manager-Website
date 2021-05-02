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
const login= require('./routes/loginHelper.js')

//uses for app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//GETs
app.get('/login', function (req, res) {
    console.log('login requested get')
    res.sendFile(path.join(__dirname, './public/views/login.html'))
});

//POSTs
app.post('/login', function(req,res){
    console.log('login requested')
    login(req.body.username,req.body.password)
    .then(()=>{
        console.log(req.body.username)
        const token = jsonWebToken.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET)
        res.send({Success:true, accessToken: token})
    })
    .catch(err=>{
        console.log(err)
        res.send({Success:false, Message:err})
    })
    })    

    //The port the app is running on 
app.listen(8081, () => {
    console.log('Server is running on port 8081...');
});