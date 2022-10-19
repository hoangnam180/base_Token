const express = require("express");
const siteControllers = require("../controller/siteControllers");
const router = express.Router();

router.get("/", siteControllers.index);
module.exports = router;
