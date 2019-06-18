const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const createRestApiRoute = require("./routes/create.rest.api.route");
const callRestApiRoute = require("./routes/call.rest.api.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/", createRestApiRoute);
app.use("/rest", callRestApiRoute);

module.exports = app;
