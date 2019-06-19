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

exports.callRestApi = async function(req) {
  const uuid = req.params.hash;
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  const json = userRestService[uuid](req);
  return json;
};
