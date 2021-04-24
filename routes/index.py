from flask import Flask, send_file, request
from flask_sqlalchemy import SQLAlchemy
import hashlib
import os
#import helper functions
import sys
sys.path.append("./indexHelperFunctions")

# import createAccountHelper
# import indexHelperFunctions.createAccountHelper
from indexHelperFunctions.createAccountHelper import create_account_helper_funtion
app=Flask(__name__, static_folder='/public')
from flask import Flask, send_file, render_template

 
app=Flask(__name__, static_folder='../public/static/', template_folder='../public/views/')
app.config["DEBUG"]= True
app.config['SECRET_KEY']= '2jfdi3nfgiu4nsi343'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///'



@app.route('/', methods=['GET'])
@app.route('/index/', methods=['GET'])
def index():
        return render_template('index.html')

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
        try:
                create_account_helper_funtion(userName,hashedPassword,salt)       
                token = jwt.encode({
                        'user':request.body['username']
                },
                app.config['SECRET_KEY'])
                return jsonify({'Success': True, 'token': token.decode('utf-8')})
        except:
                return json({'Success': False, 'Message':'Could not create account'})


@app.route('/login/', methods=['GET'])
def login():
        return render_template('login.html') 
        

if __name__ == "__main__":
    app.run(port=5001)
