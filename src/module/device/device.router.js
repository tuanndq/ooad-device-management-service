const DeviceController = require("./device.controller");

const router = require("express").Router();

router.get("/details/:id", DeviceController.getDetailsDevice);

router.get("/", DeviceController.getAllDevice);

router.post("/", DeviceController.createDevice);

router.put("/:id", DeviceController.updateDevice);

router.delete("/:id", DeviceController.deleteDevice);

module.exports = router;
