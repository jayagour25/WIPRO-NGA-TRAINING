async function generateInvoice(order, payment) {
  console.log("Generating invoice...");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        invoiceId: "INV555",
        orderId: order.id,
        paymentId: payment.paymentId,
        total: order.amount,
        message: "Invoice generated successfully"
      });
    }, 1500);
  });
}

module.exports = generateInvoice;
