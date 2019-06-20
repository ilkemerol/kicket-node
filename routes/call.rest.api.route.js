const express = require("express");
const router = express.Router();

const restApiController = require("../controllers/rest.api.controller");

router.post("/:hash", restApiController.callRestApi);

router.get("/:hash", restApiController.callRestApi);

router.get("/html/:hash", restApiController.callStaticHtml);

module.exports = router;
