from flask import Flask, send_file, render_template

 
app=Flask(__name__, static_folder='../public/static/', template_folder='../public/views/')
app.config["DEBUG"]= True
@app.route('/', methods=['GET'])
@app.route('/index/', methods=['GET'])
def index():
        return render_template('index.html')

@app.route('/login/', methods=['GET'])
def login():
        return render_template('login.html')