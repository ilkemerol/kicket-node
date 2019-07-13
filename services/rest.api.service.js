const randomstring = require("randomstring");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("../utils/kicket.logger");

const gitService = require("../services/git.service");
const { fork } = require("child_process");
const workerTimeout = process.env.WORKER_TO;

exports.createRestApi = async function(req) {
  var userRestApi = req.body;
  const uuid = randomstring.generate({ length: 32, charset: "alphabetic" });
  fs.mkdirSync("./codes/" + uuid, { recursive: true }, err => {
    if (err) throw err;
  });
  fs.appendFileSync("./codes/" + uuid + "/" + uuid + ".js", userRestApi);
  logger.doit("Create folder and file with UUID: " + uuid);
  gitService.pushFile(uuid);
  return uuid;
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
  logger.doit("Creating child process for, " + uuid);
  var root = path.dirname(require.main.filename);
  const forked = fork(root + "/worker/worker.layer.js");
  forked.send({ body: req.body, uuid: uuid });
  setTimeout(function() {
    forked.kill();
    logger.doit("Kicket try to kill child process.");
  }, workerTimeout);
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
      "/* You can define multiple method definition, just change <default> keyword with your method name. */\n /* If you changed <default> keyword, you need to send your method name in request */\n/* ex. { method: <your method name> } */" +
      'exports.default = (req, res, next) => { const result = { id: 1, name: "rest create servicee" } return result; }',
    exampleRequest: '{"customVariable": "myVariable"}'
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
