from flask import Flask, send_file
import hashlib
#import helper functions
import sys
sys.path.append("./loginHelperFunctions")

import loginHelper
import loginHelperFunctions.loginHelper

app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
        return("./public/veiws/login.html")

@app.route('/login',methods=['GET'])
def login():
        userName=request.form.get('userName')
        hashedPassword=hashlib.sha256((request.form.get('password')).encode())
        loginResult=login(userName,hashedPassword)
        if loginResult.Success == True:
            #generate token
            #return createAccountResult+{"accesstoken":token}
            return True
        else:
            return False

if __name__ == "__main__":
    app.run(port=5001)