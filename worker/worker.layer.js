process.on("message", message => {
  process.send(safeCallUserAPI(message, message.uuid));
});

function safeCallUserAPI(req, uuid) {
  const userRestService = require("../codes/" + uuid + "/" + uuid);
  if (
    !req.body.method &&
    typeof userRestService[uuid + "_default"] === "function"
  ) {
    const json = userRestService[uuid + "_default"](req);
    return json;
  } else if (
    req.body.method &&
    typeof userRestService[uuid + "_" + req.body.method] === "function"
  ) {
    const json = userRestService[uuid + "_" + req.body.method](req);
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
