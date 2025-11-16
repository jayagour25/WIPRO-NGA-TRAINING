function processPayment(order) {
  console.log("Processing payment...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) {
        return reject("Invalid order, payment failed!");
      }

      if (order.amount > 0) {
        resolve({
          paymentId: "PAY123",
          status: "Payment Successful",
          amount: order.amount
        });
      } else {
        reject("Payment amount invalid!");
      }
    }, 1500);
  });
}

module.exports = processPayment;
