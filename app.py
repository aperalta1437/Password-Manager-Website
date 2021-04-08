from flask import Flask, send_file
import requests
 
app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
        res= requests.get("localhost:somePort/")
        return send_file(res.text)

@app.route('/createAccount', methods=['POST'])
def createAccount():
        res= requests.get("localhost:somePort/createAccount")
        return (res)

#error handling
#error requesting a nonexistant page
@app.errorhandler(404)
def page_not_found(e):
    return "exception", 404

#error for general exception
@app.errorhandler(Exception)
def server_error(err):    
    return "exception", 500

#Run app on port 5000
if __name__ == "__main__":
    app.run(port=5000)