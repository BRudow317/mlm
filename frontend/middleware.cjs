// middleware.cjs
// npx json-server@0.17.4 db.json --port 8008 --middlewares ./middleware.js
module.exports = (req, res, next) => {

  const pojo = {
    message: "Middleware active",
    method: [
      "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
    ],
    status: [
      200, 201, 204, 400, 401, 403, 404, 500
    ]
  };
  if (pojo.method.includes(req.method)) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Status-Code", "200");
    res.sendStatus(200);
    return res;
  }
  else if (req.message === "500" ) {
    return res.sendStatus(500);
  }

  next();
};
