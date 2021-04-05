from flask import Flask, send_file
import requests
 
app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
        res= requests.get("localhost:somePort")
        return send_file(res.text)