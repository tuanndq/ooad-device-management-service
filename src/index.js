require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AuthMiddleware = require("./middleware/auth.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

require("./database/index");

app.use(cors());

app.use(express.json());

app.use("/auth", require("./module/auth/auth.router"));
app.use(AuthMiddleware);
app.use("/device", require("./module/device/device.router"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
