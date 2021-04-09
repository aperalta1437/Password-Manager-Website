import json
#import stuff here for database connection

def login_helper_funtion (userName,hashedPassword):
    try:
         #make sure username is not already taken
         dataBase="some database object"
         if(dataBase.findOne({userName:userName}):
            hashedPassword=hashlib.pbkdf2_hmac(
                'sha256',                
                (request.form.get('password')).encode('utf-8'),
                dataBase.salt,
                100000,
                dklen=128               
               )
               if(dataBaseObject.password==hashedPassword):
                  return json.dumps({"Success":True,"Message":"User has been created"})      
               else:  
                  return json.dumps({"Success":False,"Message":"Incorrect Username or Password"})
         else:
            return json.dumps({"Success":False,"Message":"Incorrect Username or Password"})

    except Exception as e:
	    return json.dumps({"Success":False,"Message":str(e)})