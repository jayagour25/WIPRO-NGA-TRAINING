// asyncCopy.js
import { promises as fs } from "fs";

async function copyFile() {
  try {
    const data = await fs.readFile("input.txt", "utf-8");
    
    // Artificial delay (bonus)
    await new Promise((res) => setTimeout(res, 1000));

    await fs.writeFile("output.txt", data);

    console.log("File copied successfully using async/await!");

  } catch (err) {
    console.error("Error:", err);
  }
}

copyFile();
