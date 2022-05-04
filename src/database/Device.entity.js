const { Model, DataTypes } = require("sequelize");
const sequelize = require("./config");

class Device extends Model {}

Device.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maximumGuess: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcribeTime: {
      type: DataTypes.DATE,
    },
    expTime: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "device",
    tableName: "device",
    timestamps: true,
  }
);

module.exports = Device;
