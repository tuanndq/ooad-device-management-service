const sequelize = require("./config");
const User = require("./User.entity");
const Device = require("./Device.entity");

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Device,
};
