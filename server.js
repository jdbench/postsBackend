const express = require("express");
const app = express();
const mongo = require("./db/mongo.js");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-Control-Allow-Methods", "Get, POST, PUT, DELETE, OPTIONS");
    next();
  })
  .use("/", routes);

mongo.initDb((e, mongo) => {
  if (e) console.error(e);
  else {
    app.listen(port, () => {
      console.log("Server is runing on port " + port);
    });
  }
});
