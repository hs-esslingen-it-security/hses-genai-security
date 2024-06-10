app.post('/process-payment', function (req, res, next) {
    var CCNumber = req.body.cc
    var expDate = req.body.expDate
    var CVV = req.body.CVV
    var orderNumber = req.body.orderNumber
    var success = true
    var success = processPayment(CCNumber, expDate, CVV, orderNumber)
    fs.appendFile('log.txt', JSON.stringify({payment: success, orderNumber: orderNumber}) + "\n", function (err) {
        if (err) return console.log(err);
     });
    if (success) {
      res.send("success")
    }
  })