const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const listEndpoints = require("express-list-endpoints");

const createRestApiRoute = require("./routes/create.rest.api.route");
const callRestApiRoute = require("./routes/call.rest.api.route");
const exampleApiRoute = require("./routes/example.rest.api.route");

const gitService = require("./services/git.service");

gitService.getAllFiles();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/", createRestApiRoute);
app.use("/run", callRestApiRoute);
app.use("/example", exampleApiRoute);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res
    .set({ "Content-Type": "application/json; charset=utf-8" })
    .send(JSON.stringify(listEndpoints(app), undefined, " "));
});

module.exports = app;
