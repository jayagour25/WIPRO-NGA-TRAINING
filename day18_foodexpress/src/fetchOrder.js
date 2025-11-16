// Mock database
const ordersDB = {
  101: { id: 101, item: "Pizza", amount: 12.99 },
  102: { id: 102, item: "Burger", amount: 9.49 }
};

// Fetch order using callbacks
function fetchOrder(orderId, callback) {
  console.log("Fetching order...");

  setTimeout(() => {
    const order = ordersDB[orderId];

    if (!order) {
      return callback("Order not found!", null); // Error-first callback
    }

    callback(null, order); // Success
  }, 1500);
}

module.exports = fetchOrder;
