const express = require("express");
const router = express.Router();

const restApiController = require("../controllers/rest.api.controller");

router.post("/", restApiController.exampleRestApi);

module.exports = router;
