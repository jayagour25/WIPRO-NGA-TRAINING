// feedback.js
import { promises as fs } from "fs";

async function handleFeedback() {
  const userInput = "Node.js is awesome!"; // You can change this

  try {
    // Write data to file
    await fs.writeFile("feedback.txt", userInput);
    console.log("Data written successfully.");

    // Read the file back
    console.log("Reading file...");
    const data = await fs.readFile("feedback.txt", "utf-8");
    console.log(data);

  } catch (err) {
    console.error("Error:", err);
  }
}

handleFeedback();
