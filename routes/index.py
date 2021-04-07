from flask import Flask, send_file
import hashlib
#import helper functions
app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
        return("./public/veiws/index.html")

@app.route('/createAccount',methods=['POST'])
def createAccount():
        userName=request.userName
        hashedPassword=hashlib.md5((request.password).encode())
        createAccount(userName,hashedPassword)
