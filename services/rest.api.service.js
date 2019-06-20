const randomstring = require("randomstring");
const fs = require("fs");

exports.createRestApi = async function(req) {
  var userRestApi = req.body;
  const uuid = randomstring.generate({ length: 32, charset: "alphabetic" });
  userRestApi = userRestApi.replace("uuid", uuid);
  fs.mkdirSync("./codes/" + uuid, { recursive: true }, err => {
    if (err) throw err;
  });
  fs.appendFileSync("./codes/" + uuid + "/" + uuid + ".js", userRestApi);
  return uuid;
};

exports.createStaticHtml = async function(req) {
  userFile = req.body;
  const uuid = randomstring.generate({ length: 32, charset: "alphabetic" });
  fs.mkdirSync("./codes/" + uuid, { recursive: true }, err => {
    if (err) throw err;
  });
  fs.appendFileSync("./codes/" + uuid + "/" + uuid + ".html", userFile);
  return uuid;
};

exports.callRestApi = async function(req) {
  const uuid = req.params.hash;
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  const json = userRestService[uuid](req);
  return json;
};

exports.callStaticHtml = async function(req) {
  const uuid = req.params.hash;
  return fs.readFileSync("./codes/" + uuid + "/" + uuid + ".html", {
    encoding: "utf-8"
  });
};

exports.exampleRestApi = async function() {
  const json = {
    exampleCode:
      'exports.uuid = (req, res, next) => { const result = { id: 1, name: "rest create servicee" } return result; }',
    exampleRequest: '{"customVariable": "myVariablea"}'
  };
  return json;
};
