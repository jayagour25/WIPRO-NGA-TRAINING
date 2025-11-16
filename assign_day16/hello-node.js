// hello-node.js

// Log Node.js version
console.log("Node.js version:", process.version);

// Log current file name and directory
console.log("Current file name:", __filename);
console.log("Current directory:", __dirname);

// Function to print welcome message
function printWelcomeMessage() {
  const now = new Date();
  console.log(
    `Welcome to Node.js! 🟢 Time now: ${now.toLocaleTimeString()}`
  );
}

// Run printWelcomeMessage every 3 seconds
const intervalId = setInterval(printWelcomeMessage, 3000);

// Bonus: stop after 10 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("⏹ Stopped welcome messages after 10 seconds.");
}, 10000);
