const restApiService = require("../services/rest.api.service");

exports.createRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.createRestApi(req);
  return res.status(200).json({
    platform: "node",
    endpoint: serviceResponse
  });
};

exports.createStaticHtml = async function(req, res, next) {
  var serviceResponse = await restApiService.createStaticHtml(req);
  return res.status(200).json({
    platform: "html",
    endpoint: serviceResponse
  });
};

exports.callRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.callRestApi(req);
  return res.status(200).json({
    response: serviceResponse
  });
};

exports.callStaticHtml = async function(req, res, next) {
  var serviceResponse = await restApiService.callStaticHtml(req);
  return res.status(200).send(serviceResponse);
};

exports.exampleRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.exampleRestApi();
  return res.status(200).json({
    response: serviceResponse
  });
};
