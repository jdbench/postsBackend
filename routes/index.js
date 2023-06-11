const users = require("./users.js");
const posts = require("./posts.js");
const swagger = require("./swagger.js");
const { requiresAuth } = require("express-openid-connect");

const routes = require("express").Router();

routes.use("/", swagger);
routes.use("/api-docs", swagger);
routes.use("/users", users);
routes.use("/posts", posts);
routes.use("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = routes;
