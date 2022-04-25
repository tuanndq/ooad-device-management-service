require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("./database/config");

app.use("/", require("./module/device/device.router"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
