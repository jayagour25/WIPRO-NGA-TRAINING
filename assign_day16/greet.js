// greet.js

const moment = require("moment");

// process.argv[0] -> 'node'
// process.argv[1] -> path/to/greet.js
// process.argv[2] -> first argument (name)
const name = process.argv[2];

if (!name) {
  console.log("Usage: node greet.js <YourName>");
  process.exit(1);
}

// Format: Fri Nov 7 2025, 10:45 AM
const formattedDateTime = moment().format("ddd MMM D YYYY, h:mm A");

console.log(`Hello, ${name}! Today is ${formattedDateTime}`);
