require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 4000;
module.exports = app;
app.listen(PORT, () => {
  console.log(`SkillSphere API listening on port ${PORT}`);
});
