const mongodbUrl = 'mongodb+srv://JGrizos:Furbee19085@cluster0.tzikv.mongodb.net/331DB';
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const bcrypt = require('bcryptjs');
//const connectDb = require('Connection');
module.exports = function (customer) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, function (err, db) {
            let dbo = db.db("331DB");
            let hashedPassword = bcrypt.hashSync(customer.body.password, 10);
            let values = { username: customer.body.username, hashedPassword: hashedPassword, customerData:''} 
            dbo.collection("customers").insertOne(values)
                .then(function (result) {
                    if (result === null) {
                        reject({ Success: false });
                    }
                    else {
                        resolve({ Success: true})
                        db.close()
                    }
                });
        });
    })

}


