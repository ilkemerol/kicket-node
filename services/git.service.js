const fs = require("fs");
const dotenv = require("dotenv");
const rmdirRecursiveSync = require("rmdir-recursive").sync;
const simpleGitPromise = require("simple-git/promise");
const logger = require("../utils/kicket.logger");

dotenv.config();

const REPO = process.env.GIT_SAFE_URL;

exports.getAllFiles = () => {
  if (fs.existsSync("./codes")) {
    logger.doit("codes folder is exist, deleting ...");
    rmdirRecursiveSync("./codes");
    simpleGitPromise()
      .silent(true)
      .clone(REPO, "./codes", ["--branch", "node"])
      .then(logger.doit("All user's code clone in codes folder."))
      .catch(err =>
        logger.doit("Something went wrong during cloning, detail: " + err)
      );
  } else {
    logger.doit("codes folder is not exist, create and clone ...");
    simpleGitPromise()
      .silent(true)
      .clone(REPO, "./codes", ["--branch", "node"])
      .then(logger.doit("All user's code clone in codes folder."))
      .catch(err =>
        logger.doit("Something went wrong during cloning, detail: " + err)
      );
  }
};

exports.pushFile = uuid => {
  require("simple-git")("./codes")
    .add("./*")
    .commit("Auto commit, " + uuid)
    .addRemote("git-node", REPO)
    .push(["-u", "git-node", "node"], () =>
      logger.doit("User code committed.")
    );
};
