const randomstring = require("randomstring");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/kicket.logger");

const gitService = require("../services/git.service");
const { fork } = require("child_process");

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
    gitService.pushFile(uuid);
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
  logger.doit("Running UUID: " + uuid + " Method: default");
  var root = path.dirname(require.main.filename);
  const forked = fork(root + "/worker/worker.layer.js");
  forked.send({ body: req.body, uuid: uuid });
  setTimeout(function() {
    forked.kill();
    logger.doit("Kicket try to kill child process.");
  }, 5000);
  return new Promise(function(resolve, reject) {
    forked.on("message", message => {
      resolve(message);
    });
    forked.on("exit", message => {
      const json = {
        timeout: true,
        code: "N777",
        message: "We believe, you can decrease your complexity."
      };
      logger.doit("Your done bro, rest in peace.");
      resolve(json);
    });
  });
};

exports.exampleRestApi = function(req) {
  const json = {
    exampleCode:
      "/* Please, do NOT remove uuid keyword. */\n/* You can define multiple method definition, just change _default keyword with your method name. */\n /* If you changed _default keyword, you need to send your method name in request */\n/* ex. { method: <your method name> } */" +
      'exports.uuid_default = (req, res, next) => { const result = { id: 1, name: "rest create servicee" } return result; }',
    exampleRequest: '{"customVariable": "myVariablea"}'
  };
  return json;
};
