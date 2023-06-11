const express = require("express");
const app = express();
const mongo = require("./db/mongo.js");
const routes = require("./routes");
const bodyParser = require("body-parser");
const { auth } = require("express-openid-connect");
const port = process.env.PORT || 8080;

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })
  .use(auth(authConfig))
  .use("/", routes);

mongo.initDb((e) => {
  if (e) console.error(e);
  else {
    app.listen(port, () => {
      console.log("Server is runing on port " + port);
    });
  }
});
