const express = require("express");
const router = express.Router();

const restApiController = require("../controllers/rest.api.controller");

router.post("/create", restApiController.createRestApi);

router.post("/create/html", restApiController.createStaticHtml);

module.exports = router;
