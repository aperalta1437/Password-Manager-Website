const bcrypt = require('bcryptjs');
const mongodbUrl = 'mongodb+srv://JGrizos:Furbee19085@cluster0.tzikv.mongodb.net/331DB';
const MongoClient = require('mongodb').MongoClient
//const connectDb = require('Connection');
module.exports = function (username) {
  return new Promise((resolve, reject) => {

    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, function (err, db) {
      var dbo = db.db("331DB");

      dbo.collection("customers").findOne({ 'username': username })
        .then(function (result) {
          if (null === result) {            
            reject("User not found");
          }
          
          else {
                resolve({Success:true, Message:result.customerData})
          }
          db.close()
        })
        .catch(err=>{
          reject(err)
        })
    });
  })

}

