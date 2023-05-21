const {
    createPost,
    deleteOne,
    getAll,
    getOne,
    updateOne,
  } = require("../controllers/posts.js");
  const routes = require("express").Router();

routes.get("/", getAll);
routes.get("/:id", getOne);
routes.post("/", createPost);
routes.put("/:id", updateOne);
routes.delete("/:id", deleteOne);

module.exports = routes;
