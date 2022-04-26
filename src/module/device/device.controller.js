const { Device } = require("../../database");
const { Status } = require("../../helper/enum");

const DeviceController = {
  getAllDevice: async (req, res) => {
    try {
      const devices = await Device.findAll({
        attributes: ["type", "status"],
      });
      return res.status(200).json(devices);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Get all device error." });
    }
  },

  getDetailsDevice: async (req, res) => {
    const { id } = req.params;
    try {
      const device = await Device.findOne({
        where: { id },
        attributes: [
          "type",
          "status",
          "maximumGuess",
          "subcribeTime",
          "expTime",
        ],
      });
      return res.status(200).json(device);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: `Get details device with id = ${id} error. ` });
    }
  },

  createDevice: async (req, res) => {
    const body = req.body;
    try {
      const newDevice = new Device(body);
      await newDevice.save();
      return res.status(200).json({ newDevice });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Create new device error." });
    }
  },

  updateDevice: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const device = await Device.update(body, {
        where: { id },
        returning: true,
      });
      return res.status(200).json(device);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: `Update device with id = ${id} error.` });
    }
  },

  deleteDevice: async (req, res) => {
    const { id } = req.params;
    try {
      const device = await Device.findOne({ where: { id } });
      if (!device) {
        throw new Error(`Device with id = ${id} not found.`);
      }
      if (device.status == Status.INACTIVE) {
        throw new Error(`Device with id = ${id} already been deleted.`);
      }
      await Device.update(
        { status: Status.INACTIVE },
        {
          where: { id },
        }
      );
      return res
        .status(200)
        .json({ message: `Delete device with id = ${id} done.` });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: `Delete device width id = ${id} error.` });
    }
  },
};

module.exports = DeviceController;
