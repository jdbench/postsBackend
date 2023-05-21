const { ObjectId } = require("mongodb");
const { getDb } = require("../db/mongo.js");

const getAll = async (req, res, next) => {
  const result = await getDb().db().collection("posts").find();
  result.toArray().then((data) => {
    console.log("fetched " + JSON.stringify(data));
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  });
};

const getOne = async (req, res, next) => {
  const query = { _id: new ObjectId(req.params.id) };
  const result = await getDb().db().collection("posts").findOne(query);
  if (!result) res.send("Not found").status(404);
  else {
    res.status(200).json(result);
  }
};

const createPost = async (req, res, next) => {
  const userId = req.body.userId;
  const content = req.body.content;
  if (!userId || !content) {
    res.status(400).send("Required parameter was not defined");
  } else {
    try {
      const result = await getDb().db().collection("posts").insertOne({
        userId,
        content,
      });
      res.status(201).json(result);
    } catch (e) {
      res.status(500).json(response.error ?? "There was an error.");
    }
  }
};

const updateOne = async (req, res, next) => {
  const _id = new ObjectId(req.params.id);
  const userId = req.body.userId;
  const content = req.body.content;
  if (!userId || !content) {
    res.status(400).send("Required parameter was not defined");
  } else {
    const post = {
      userId,
      content,
    };
    try {
      const result = await getDb()
        .db()
        .collection("posts")
        .replaceOne({ _id }, post);
      res.status(204).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e ?? "There was an error updating the post.");
    }
  }
};
const deleteOne = async (req, res, next) => {
  const _id = new ObjectId(req.params.id);
  try {
    const result = await getDb().db().collection("posts").deleteOne({ _id });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e ?? "There was an error updating the post.");
  }
};

module.exports = { createPost, deleteOne, getAll, getOne, updateOne };
