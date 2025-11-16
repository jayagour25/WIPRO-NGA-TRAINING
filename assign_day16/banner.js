import figlet from "figlet";
import chalk from "chalk";

figlet("Welcome to Node.js", (err, data) => {
  if (err) {
    console.log("Something went wrong with figlet...");
    console.dir(err);
    return;
  }

  console.log(chalk.green.bold(data));
  console.log(chalk.cyan("🚀 Node.js is ready to rock!"));
});
