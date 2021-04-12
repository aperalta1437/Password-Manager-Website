from flask import Flask, send_file
import requests
 
app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

main_page_port = 5000

@app.route('/', methods=['GET'])
def index():
        res = requests.get("localhost:" + str(main_page_port))
        return send_file(res.text)