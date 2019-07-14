const restApiService = require("../services/rest.api.service");
const { fork } = require("child_process");
const path = require("path");

exports.createRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.createRestApi(req);
  return res.status(200).json({
    platform: "node",
    endpoint: serviceResponse
  });
};

exports.callRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.callRestApi(req);
  return res.status(200).json({
    response: serviceResponse
  });
};

exports.exampleRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.exampleRestApi();
  return res.status(200).json(serviceResponse);
};

exports.existRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.existRestApi(req);
  return res.status(200).json(serviceResponse);
};
