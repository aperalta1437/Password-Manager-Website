from flask import Flask, send_file
import hashlib
#import helper functions
import sys
sys.path.append("./indexHelperFunctions")

import createAccountHelper
import indexHelperFunctions.createAccountHelper

app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
        return("./public/veiws/index.html")

@app.route('/createAccount',methods=['POST'])
def createAccount():
        userName=request.form.get('userName')
        hashedPassword=hashlib.md5((request.form.get('password')).encode())
        createAccountResult=createAccount(userName,hashedPassword)
        if createAccountResult.Success == True:
                #generate token
                #return createAccountResult+{"accesstoken":token}
                return True
        else:
                return False

if __name__ == "__main__":
    app.run(port=5001)