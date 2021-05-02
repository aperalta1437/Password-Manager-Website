//Generic imports
const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const utf8 = require('utf8')
const path = require('path')
const jsonWebToken = require('jsonwebtoken')
const bodyParser = require('body-parser')
require('dotenv').config()
const http = require('http');
const RP = require('request-promise');

//import routes
const createAccount = require('./routes/createAccountHelper.js')
const createA = require('./routes/cAH.js')

//import Models
const Customer = require('./models/Customer-Model.js')
const CustomerData = require('./models/ManagedData-Model.js')

//uses for app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.send({ Success: false, err })
        req.user = user
        next()
    })

}

//GETs for App
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, './public/views/index.html'))
});

app.get('/login', function (req, res) {
    RP({uri:'http://localhost:8081/login',
        method: 'GET'
    }).then((response)=>{
        res.sendStatus(200).send(response)
    })
    .catch((err)=>{
        return res.status(500).send(err.message)
    })
});

app.post('/createAccount', function (req, res) {
    createA(req)
        .then(() => {
            console.log(req.body.username)
            const token = jsonWebToken.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET)
            res.send({ Success: true, accessToken: token })
        })
        .catch(err => {
            console.log(err)
            res.send({ Success: false, Message: err })
        })
})

//connectation to database
mongoose.connect(
    'mongodb+srv://JGrizos:Furbee19085@cluster0.tzikv.mongodb.net/331DB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected.')
});

//Error handling for HTTP
app.use((req, res, next) => {
    const err = new Error("An error occur.")
    next(err)
})

//printing the error
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

//The port the app is running on 
app.listen(8080, () => {
    console.log('Server is running on port 8080...');
});


//GETs

