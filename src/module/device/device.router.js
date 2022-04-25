const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("List devices");
});

router.post("/", (req, res) => {});

router.patch("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
