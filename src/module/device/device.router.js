const DeviceController = require("./device.controller");

const router = require("express").Router();

router.get("/details/:id", DeviceController.getDetailsDevice);

router.get("/", DeviceController.getAllDevice);

router.post("/", DeviceController.createDevice);

router.put("/", DeviceController.updateDevice);

router.delete("/", DeviceController.deleteDevice);

module.exports = router;
