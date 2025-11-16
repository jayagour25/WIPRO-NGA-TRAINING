import { promises as fs } from "fs";

fs.readFile("input.txt", "utf-8")
  .then((data) => {
    return fs.writeFile("output.txt", data);
  })
  .then(() => {
    console.log("File copied successfully!");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
