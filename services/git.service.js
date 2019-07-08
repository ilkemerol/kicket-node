const fs = require("fs");
const simpleGit = require("simple-git")("./git-code");
const simpleGitPromise = require("simple-git/promise");

const TOKEN = "TOKEN";
const URL = "URL";
const REPO = "https://" + TOKEN + ":x-oauth-basic@" + URL;

exports.getAllFiles = () => {
  if (fs.existsSync("./git-code")) {
    console.log("asdasd");
  }
  simpleGitPromise()
    .silent(true)
    .clone(REPO, "./git-code", ["--branch", "BRANCH"])
    .then(() => console.log("finished"))
    .catch(err => console.error("failed:", err));
};
