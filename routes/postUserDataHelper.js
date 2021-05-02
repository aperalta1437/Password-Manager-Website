
const mongodbUrl = 'mongodb+srv://JGrizos:Furbee19085@cluster0.tzikv.mongodb.net/331DB';
const MongoClient = require('mongodb').MongoClient
const mongo = require("mongodb")
//const connectDb = require('Connection');
module.exports = function (username, userData) {
  return new Promise((resolve, reject) => {

    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, function (err, db) {
      let dbo = db.db("311DB");
      let query = { "username": username };
      let newvalues = { $push: { "userData": userData } };
      dbo.collection("customers").updateOne(query, newvalues)
        .then(function (result) {
          if (result === null) {            
            reject("There was an error");
          }
          else {
              console.log(result)
            resolve("Successfully added user data")
            db.close()
          }
        })
        .catch(err => {
          reject(err)
        })

    })
  
  })
}