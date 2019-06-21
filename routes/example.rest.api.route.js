const express = require("express");
const router = express.Router();

const restApiController = require("../controllers/rest.api.controller");

router.get("/", restApiController.exampleRestApi);

module.exports = router;
