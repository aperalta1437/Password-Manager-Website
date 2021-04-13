from flask import Flask, send_file, render_template

 
app=Flask(__name__, static_folder='../public/static/', template_folder='../public/views/')
app.config["DEBUG"]= True
@app.route('/', methods=['GET'])
def index():
        return render_template('index.html')

@app.route('/login.html', methods=['GET'])
def login():
        return render_template('login.html')