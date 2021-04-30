//Generic imports
const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const utf8 = require('utf8')
const path = require('path')
const jsonWebToken = require('jsonwebtoken')
const bodyParser = require('body-parser')


//import routes
const createAccount= require('./routes/createAccountHelper.js')

//import Models
const Customer = require('./models/Customer-Model.js')
const CustomerData  = require('./models/ManagedData-Model.js')

//uses for app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/views/index.html'))
});

app.post('/createAccount', function(req,res){
createAccount(req)
.then(()=>{
    res.send({Success:true})
})
.catch(err=>{
    res.send({Success:false, Message:err})
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
