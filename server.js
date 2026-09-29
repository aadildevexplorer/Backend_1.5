const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
require("./cron/userClean");
const express = require("express");
const connectDB = require("./db/db");
const errorMiddleware = require("./middleware/errorMiddlware");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the Auth 2.5",
  });
});

app.use(errorMiddleware)
app.use("/api/user", require("./routes/userRoute"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
