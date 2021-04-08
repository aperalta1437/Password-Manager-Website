import json
#import stuff here for database connection

def create_account_helper_funtion (userName,hashedPassword):
    try:
         #make sure username is not already taken
         dataBase="some database object"
         if(dataBase.findOne(userName)!=null):
            return json.dumps({"Success":"false","Message":"A user with that username already exists"})
         #(Optional)make sure password meets our criteria
         #connection to database here storing userName and password
         else:
            return json.dumps({"Success":True,"Message":"User has been created"})

    except Exception as e:
	    return json.dumps({"Success":"false","Message":str(e)})
    