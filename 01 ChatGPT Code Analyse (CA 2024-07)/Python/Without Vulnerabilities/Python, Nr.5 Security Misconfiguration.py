from flask import Flask, request
from lxml import etree

parser = etree.XMLParser(resolve_entities=False)

app = Flask(__name__)

def addToFavorites(favourite):
    print(f"Favourite added: {favourite}")

@app.route('/')
def home():
    return 'Welcome to the Favourites Application!'
 
@app.route('/profile/favourites', methods=['POST'])
def favourite():
    favourite = etree.fromstring(request.data, parser=parser).find("item").text
    # addToFavorites(favourite)
    return "Favourite {} saved".format(favourite)

@app.route('/about')
def about():
    return 'This is the about page of the application.'

if __name__ == '__main__':
    app.run(debug=True)
