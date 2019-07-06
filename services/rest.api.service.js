const randomstring = require("randomstring");
const fs = require("fs");
const logger = require("../utils/kicket.logger");

exports.createRestApi = async function(req) {
  var userRestApi = req.body;
  const uuid = randomstring.generate({ length: 32, charset: "alphabetic" });
  if (userRestApi.indexOf("uuid") > -1) {
    userRestApi = userRestApi.replace(/uuid/gi, uuid);
    fs.mkdirSync("./codes/" + uuid, { recursive: true }, err => {
      if (err) throw err;
    });
    fs.appendFileSync("./codes/" + uuid + "/" + uuid + ".js", userRestApi);
    logger.doit("Create folder and file with UUID: " + uuid);
    return uuid;
  } else {
    logger.doit("Invalid kicket API UUID");
    return 0;
  }
};

exports.callRestApi = async function(req) {
  const uuid = req.params.hash;
  if (!fs.existsSync("./codes/" + uuid + "/" + uuid + ".js")) {
    const json = {
      kicketCode: "N998",
      kicketType: "error",
      kicketMessage: "No Such File"
    };
    return json;
  }
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  if (
    !req.body.method &&
    typeof userRestService[uuid + "_default"] === "function"
  ) {
    const json = userRestService[uuid + "_default"](req);
    logger.doit("Running UUID: " + uuid + " Method: default");
    return json;
  } else if (
    req.body.method &&
    typeof userRestService[uuid + "_" + req.body.method] === "function"
  ) {
    const json = userRestService[uuid + "_" + req.body.method](req);
    logger.doit("Running UUID: " + uuid + " Method: " + req.body.method);
    return json;
  } else {
    const json = {
      kicketCode: "N999",
      kicketType: "error",
      kicketMessage: "No Such Method Define"
    };
    return json;
  }
};

exports.exampleRestApi = async function(req) {
  const json = {
    exampleCode:
      "/* Please, do NOT remove uuid keyword. */\n/* You can define multiple method definition, just change _default keyword with your method name. */\n /* If you changed _default keyword, you need to send your method name in request */\n/* ex. { method: <your method name> } */" +
      'exports.uuid_default = (req, res, next) => { const result = { id: 1, name: "rest create servicee" } return result; }',
    exampleRequest: '{"customVariable": "myVariablea"}'
  };
  return json;
};

exports.existRestApi = async function(req) {
  const uuid = req.params.hash;
  if (!fs.existsSync("./codes/" + uuid + "/" + uuid + ".js")) {
    const json = {
      kicketCode: "N998",
      kicketType: "error",
      kicketMessage: "No Such File"
    };
    return json;
  }
  let code = fs.readFileSync("./codes/" + uuid + "/" + uuid + ".js", {
    encoding: "utf-8"
  });
  let json = {
    code: code,
    platform: "node"
  };
  return json;
};
