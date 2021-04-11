from flask import Flask, send_file, request
import hashlib
import os
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
        salt=os.urandom(32)
        userName=request.form.get('userName')
        hashedPassword=hashlib.pbkdf2_hmac(
                'sha256',                
                (request.form.get('password')).encode('utf-8'),
                salt,
                100000,
                dklen=128
        )
        createAccountResult=createAccount(userName,hashedPassword,salt)
        if createAccountResult.Success == True:
                #generate token
                #return createAccountResult+{"accesstoken":token}
                return True
        else:
                return False

if __name__ == "__main__":
    app.run(port=5001)