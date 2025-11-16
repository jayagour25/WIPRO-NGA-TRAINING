// callbackRead.js
import fs from "fs";

console.log("Starting file read...");

fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) {
    return console.error("Error reading file:", err);
  }

  console.log("File content:");
  console.log(data);

  // Bonus: intentional delay
  setTimeout(() => {
    console.log("Read operation completed");
  }, 1000);
});

console.log("This log shows asynchronous behavior!");
