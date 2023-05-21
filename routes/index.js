const users = require("./users.js");
const posts = require("./posts.js");
const swagger = require("./swagger.js");

const routes = require("express").Router();

routes.use("/", swagger);
routes.use("/users", users);
routes.use("/posts", posts);

module.exports = routes;
