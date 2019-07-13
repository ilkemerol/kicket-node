const logger = require("../utils/kicket.logger");

process.on("message", message => {
  process.send(safeCallUserAPI(message, message.uuid));
});

function safeCallUserAPI(req, uuid) {
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  if (!req.body.method && typeof userRestService["default"] === "function") {
    logger.doit("Running UUID: " + uuid + " Method: default");
    const json = userRestService["default"](req);
    return json;
  } else if (
    req.body.method &&
    typeof userRestService[req.body.method] === "function"
  ) {
    logger.doit("Running UUID: " + uuid + " Method: " + req.body.method);
    const json = userRestService[req.body.method](req);
    return json;
  } else {
    const json = {
      kicketCode: "N999",
      kicketType: "error",
      kicketMessage: "No Such Method Define"
    };
    return json;
  }
}
