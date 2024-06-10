from flask import Flask, request, send_file, render_template
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/logo')
def logo():
    base = "/todoapp/content/images"
    img = request.args.get('image_name')
    safepath = os.path.realpath(img)
    prefix = os.path.commonpath(base, safepath)
    if prefix == base:
      return send_file(os.path.join(base, safepath))

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

if __name__ == '__main__':
    app.run(debug=True)
