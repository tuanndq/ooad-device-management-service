require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("device_management", `root`, `tuanndq`, {
  host: "localhost",
  port: process.env.DB_PORT,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
