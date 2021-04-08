import json
#import stuff here for database connection

def login_helper_funtion (userName,hashedPassword):
    try:
         #make sure username is not already taken
         dataBase="some database object"
         if(dataBase.findOne({userName:userName,hashedPassword:hashedPassword}):
            return json.dumps({"Success":True,"Message":"User has been created"})        
         else:
            return json.dumps({"Success":False,"Message":"Incorrect Username or Password"})

    except Exception as e:
	    return json.dumps({"Success":False,"Message":str(e)})