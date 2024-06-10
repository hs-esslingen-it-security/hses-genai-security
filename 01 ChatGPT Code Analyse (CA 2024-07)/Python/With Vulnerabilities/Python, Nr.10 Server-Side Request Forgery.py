from flask import Flask, request, render_template
from urllib.parse import urlparse
import http.client

app = Flask(__name__)

def updateProfileImage(imageData):
    print('Updating profile image')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/pfp')
def pfp():
    url = urlparse(request.args.get('url'))
    conn = http.client.HTTPConnection(url.hostname, url.port)
    conn.request('GET', url.path)
    response = conn.getresponse()
    updateProfileImage(response.read())
    return response.read()

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

if __name__ == '__main__':
    app.run(port=3000)
