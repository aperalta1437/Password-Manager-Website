const Customer = require('../models/Customer-Model.js')

module.exports = function (req, cartID) {
    return new Promise((resolve, reject) => {
        const customer = new Customer();        
        customer.username = req.body.username;        
        customer.password = req.body.password;               
        customer.save()        
            .then(() => {                
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject('User is not registered')
            })
    })
}