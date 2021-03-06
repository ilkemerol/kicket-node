const express = require("express");
const router = express.Router();

const restApiController = require("../controllers/rest.api.controller");

router.post("/:hash", restApiController.callRestApi);

router.get("/:hash", restApiController.callRestApi);

router.get("/exist/:hash", restApiController.existRestApi);

module.exports = router;
