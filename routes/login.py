from flask import Flask, send_file, request
import hashlib
import os
#import helper functions
import sys
sys.path.append("./loginHelperFunctions")

import loginHelper
import loginHelperFunctions.loginHelper

app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True
app.config['SECRET_KEY']= '2jfdi3nfgiu4nsi343'

@app.route('/', methods=['GET'])
def index():
        return("./public/veiws/login.html")

@app.route('/login',methods=['GET'])
def login():
        userName=request.form.get('userName')
        password=request.form.get('password')       
        try:
            loginHelper(userName,password)       
            token = jwt.encode({
                    'user':request.body['username']
                    },
            app.config['SECRET_KEY'])
            return jsonify({'Success': True, 'token': token.decode('utf-8')})
        except:
            return jsonify({'Success': False, 'Message':'Could not create account'})

if __name__ == "__main__":
    app.run(port=5002)