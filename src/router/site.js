const express = require("express");
const authMiddleware = require("../middlewares/auth.middlewares");
const siteControllers = require("../controller/siteControllers");
const router = express.Router();

router.get("/", authMiddleware.authenToken, siteControllers.index);
module.exports = router;
