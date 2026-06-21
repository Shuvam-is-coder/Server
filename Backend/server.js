const app = require("./src/app");
const connectToDb = require("./src/config/database");
require("dotenv").config();

let dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectToDb();

app.listen(3000, () => {
  console.log("Server has started on port 3000.");
});
