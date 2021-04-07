import json
#import stuff here for database connection

def function create_account_helper_function (userName,password):
    try:
         #make sure username is not already taken
            if(dataBase.findOne(userName)!=null)
                return ('{"Success":"false","Message":"A user with that username already exists"'})
         #(Optional)make sure password meets our criteria
         #connection to database here storing userName and password
        return('{"Success":"true","Message":"User has been created"}')
    except Exception as e:
	    return('{"Success":"false","Message":str(e))'})
    