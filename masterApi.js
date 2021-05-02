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
var authToken='eyJhbGciOiJIUzI1NiJ9.YQ.ykxEKSo956c2GxBL9vYB3kaobxPMmz-VLgCMkJkBDWY';
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

//http requests
const loginOptionsGet = {
    hostname: '::1',
    port: 8081,
    path: '/login',
    method: 'GET'
}
const loginOptionsPost = {
    hostname: '::1',
    port: 8081,
    path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const recordsOptionsPost = {
    hostname: '::1',
    port: 8082,
    path: '/getRecords',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const recordsOptionsGet = {
    hostname: '::1',
    port: 8082,
    path: '/records',
    method: 'GET'
}

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
    console.log('login html triggered')
    const serverReq = http.request(loginOptionsGet, serverRes => {
        console.log(`statusCode: ${serverRes.statusCode}`)
        res.setHeader(
            'Content-Type', 'text/html'            
        )
        
        serverRes.on('data', d => {
            res.send(d)

        })
    })

    serverReq.on('error', error => {
        console.log(error)
        // res.sendStatus(500)
    })

    serverReq.end()
});

app.get('/userRecords', function (req, res) {
    const serverReq = http.request(recordsOptionsGet, serverRes => {
        console.log(`statusCode: ${serverRes.statusCode}`)
        res.setHeader(
            'Content-Type', 'text/html'
        )
        res.setHeader(
            'Authorization', 'Bearer ' + authToken
        )
        serverRes.on('data', d => {
            res.send(d)
        })
    })

    serverReq.on('error', error => {
        console.error(error)
    })

    serverReq.end()
});

app.get('/token', function (req,res){
    res.send({authToken:authToken})
})
app.post('/login', function (req, res) {
    console.log('login post triggered')

    const serverReq = http.request(loginOptionsPost, serverRes => {
        console.log(`statusCode: ${serverRes.statusCode}`)
        res.setHeader(
            'Content-Type', 'application/json'
        )
        serverRes.on('data', d => {
            const token = jsonWebToken.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET)
            accessToken=token;
            authToken=token;
            res.send({ Success: true, accessToken: token })

        })
    })

    serverReq.on('error', error => {
        console.error(error)
    })
    serverReq.write(JSON.stringify(req.body))
    serverReq.end()
})

app.post('/createAccount', function (req, res) {    
    createA(req)
        .then(() => {
            console.log(req.body.username)
            const token = jsonWebToken.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET)
            authToken=token;
            res.send({ Success: true, accessToken: token })
        })
        .catch(err => {
            console.log(err)
            res.send({ Success: false, Message: err })
        })
})

app.post('/getRecords', authenticateToken, (req,res)=>{
    const serverReq = http.request(recordsOptionsPost, serverRes => {
        console.log(`statusCode: ${serverRes.statusCode}`)
        res.setHeader(
            'Content-Type', 'application/json'
        )
        serverRes.on('data', d => { 
            console.log(d)          
            res.send(d)

        })
    })
    username={username:req.user}
    serverReq.on('error', error => {
        console.error(error)
    })
    console.log(req.body)
    serverReq.write(JSON.stringify(username))
    serverReq.end()
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
// app.use((req, res, next) => {
//     const err = new Error("An error occur.")
//     next(err)
// })

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



