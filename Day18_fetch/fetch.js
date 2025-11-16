// Step 1: Define fetchData function
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Node.js" };
        callback(null, data); // No error, send data
    }, 1000);
}

// Step 2: Call fetchData and handle callback
fetchData((err, result) => {
    if (err) {
        console.error("Error:", err);
        return;
    }
    console.log("Result:", result);
});
