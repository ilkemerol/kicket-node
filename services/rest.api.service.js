const randomstring = require("randomstring");
const fs = require("fs");

exports.createRestApi = async function(req) {
  var userRestApi = req.body;
  const uuid = randomstring.generate({ length: 7, charset: "alphabetic" });
  userRestApi = userRestApi.replace("uuid", uuid);
  fs.mkdir("./public/" + uuid, { recursive: true }, err => {
    if (err) throw err;
  });
  fs.appendFileSync("./public/" + uuid + "/" + uuid + ".js", userRestApi);
  return uuid;
};

exports.callRestApi = async function(req) {
  const uuid = req.params.hash;
  const userRestService = require("../public/" + uuid + "/" + uuid);
  const json = userRestService[uuid](req);
  return json;
};
