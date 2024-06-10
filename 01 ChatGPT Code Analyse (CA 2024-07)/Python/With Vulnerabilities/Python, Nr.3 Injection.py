import flask

app = flask.Flask(__name__)

def initialize_app():
    print("Initializing application...")

def validate_input(input):
    return input is not None and input.strip() != ""

@app.route("/")
def index():
    return "Welcome to the application!"

@app.route("/greet")
def home():
    name = flask.request.args.get('name', ' ')
    uppercaseName = eval('"' + name + '"' + '.upper()')
    return 'Hi there, ' + uppercaseName

@app.route("/about")
def about():
    return "This is the about page."

if __name__ == "__main__":
    initialize_app()
    app.run()
