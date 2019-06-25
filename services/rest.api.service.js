const randomstring = require("randomstring");
const fs = require("fs");
const logger = require("../utils/kicket.logger");

exports.createRestApi = async function(req) {
  var userRestApi = req.body;
  const uuid = randomstring.generate({ length: 32, charset: "alphabetic" });
  userRestApi = userRestApi.replace("uuid", uuid);
  fs.mkdirSync("./codes/" + uuid, { recursive: true }, err => {
    if (err) throw err;
  });
  fs.appendFileSync("./codes/" + uuid + "/" + uuid + ".js", userRestApi);
  logger.doit("Create folder and file with UUID: " + uuid);
  return uuid;
};

exports.callRestApi = async function(req) {
  const uuid = req.params.hash;
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  const json = userRestService[uuid](req);
  logger.doit("Running UUID: " + uuid);
  return json;
};

exports.exampleRestApi = async function() {
  const json = {
    exampleCode:
      'exports.uuid = (req, res, next) => { const result = { id: 1, name: "rest create servicee" } return result; }',
    exampleRequest: '{"customVariable": "myVariablea"}'
  };
  return json;
};
