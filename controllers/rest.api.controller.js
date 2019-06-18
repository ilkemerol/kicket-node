const restApiService = require("../services/rest.api.service");

exports.createRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.createRestApi(req);
  return res.status(200).json({
    endpoint: "/" + serviceResponse
  });
};

exports.callRestApi = async function(req, res, next) {
  var serviceResponse = await restApiService.callRestApi(req);
  return res.status(200).json({
    response: serviceResponse
  });
};