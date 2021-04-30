const bcrypt = require('bcryptjs');
const mongodbUrl = 'mongodb+srv://JGrizos:Furbee19085@cluster0.tzikv.mongodb.net/331DB';
const MongoClient = require('mongodb').MongoClient
//const connectDb = require('Connection');
module.exports = function (username, password) {
  return new Promise((resolve, reject) => {

    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, function (err, db) {
      var dbo = db.db("331DB");

      dbo.collection("customers").findOne({ 'username': username })
        .then(function (result) {
          if (null === result) {            
            reject("User not found");
          }
          
          else {
            let hash = result.hashedPassword;            

            if (bcrypt.compareSync(password, hash)) {                            
              resolve();

            } else {
              console.log("AUTHENTICATION FAILED");
              reject("Password failed");
            }
          }
          db.close()
        })
        .catch(err=>{
          reject(err)
        })
    });
  })

}

