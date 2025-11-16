const fetchOrder = require("./src/fetchOrder");
const processPayment = require("./src/processPayment");
const generateInvoice = require("./src/generateInvoice");

async function completeOrderFlow(orderId) {
  try {
    // Step 1: Fetch Order (Wrap callback inside a Promise)
    const order = await new Promise((resolve, reject) => {
      fetchOrder(orderId, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    // Step 2: Process Payment
    const payment = await processPayment(order);

    // Step 3: Generate Invoice
    const invoice = await generateInvoice(order, payment);

    console.log("\n🎉 Final Invoice Generated:");
    console.log(invoice);

  } catch (error) {
    console.error("\n❌ Error:", error);
  }
}

// Run the complete process
completeOrderFlow(101);
