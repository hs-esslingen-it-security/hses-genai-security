from flask import Flask, request, json, redirect, url_for, render_template
import logging

app = Flask(__name__)

def processPayment(CCNumber, expDate, CVV, orderNumber):
    return True

def log(action, success, data):
    logging.info(f"Action: {action}, Success: {success}, Data: {data}")

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/payment-form')
def payment_form():
    return render_template('payment_form.html')

@app.route('/process-payment', methods=['POST'])
def process():
    CCNumber = request.form.get('cc')
    expDate = request.form.get('expDate')
    CVV = request.form.get('CVV')
    orderNumber = request.form.get('orderNumber')
    success = processPayment(CCNumber, expDate, CVV, orderNumber)
    log("payment", success, json.dumps(request.form))
    return redirect(url_for('confirmation'))

@app.route('/confirmation')
def confirmation():
    return render_template('confirmation.html')

if __name__ == '__main__':
    app.run(debug=True)
