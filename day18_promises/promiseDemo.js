// Step 1: Create a function that returns a Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating successful async task
            resolve({ id: 1, name: "Node.js" });

            // If you want to simulate an error, use:
            // reject("Something went wrong!");
        }, 1000);
    });
}

// Step 2: Handle Promise using .then() and .catch()
fetchData()
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Error:", error));
