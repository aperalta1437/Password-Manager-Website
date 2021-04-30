const bcrypt = require('bcryptjs');
const mongodbUrl = 'mongodb+srv://dbist440:donotgiveout@ist440db.oy495.mongodb.net/IST440DB';
const MongoClient = require('mongodb').MongoClient
//const connectDb = require('Connection');
module.exports = function (username, password) {
  return new Promise((resolve, reject) => {

    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, function (err, db) {
      var dbo = db.db("IST440DB");

      dbo.collection("customers").findOne({ 'userName': username })
        .then(function (result) {
          if (null === result) {            
            reject("User not found");
          }
          
          else {
            let hash = result.hashPassword;            

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

