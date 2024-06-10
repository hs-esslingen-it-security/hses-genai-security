const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

function processPayment(CCNumber, expDate, CVV, orderNumber) {
    console.log(`Processing payment for order ${orderNumber}`);
    return true;
}

function log(action, success, details) {
    console.log(`Action: ${action}, Success: ${success}, Details: ${details}`);
}

app.get('/', function (req, res) {
    res.send('Welcome to our payment processing application!');
});

app.get('/payment-form', function (req, res) {
    res.send('Payment Form Page');
});

app.post('/process-payment', function (req, res, next) {
    var CCNumber = req.body.cc;
    var expDate = req.body.expDate;
    var CVV = req.body.CVV;
    var orderNumber = req.body.orderNumber;
    var success = processPayment(CCNumber, expDate, CVV, orderNumber);
    log("payment", success, JSON.stringify(req.body));
});

app.get('/confirmation', function (req, res) {
    res.send('Payment Confirmation Page');
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
