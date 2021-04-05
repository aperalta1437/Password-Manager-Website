from flask import Flask, send_file
 
app=Flask(__name__, static_folder='/public')
app.config["DEBUG"]= True

@app.route('/', methods=['GET'])
def index():
    return send_file("./public/veiws/index.html")