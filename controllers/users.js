const { ObjectId } = require("mongodb");
const { getDb } = require("../db/mongo.js");

const getAll = async (req, res, next) => {
  try {
    const result = await getDb().db().collection("users").find();
    result.toArray().then((data) => {
      console.log("fetched " + JSON.stringify(data));
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data);
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("There was an error getting users.");
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await getDb().db().collection("users").findOne(query);
    if (!result) res.send("Not found").status(404);
    else {
      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("There was an error getting that user.");
  }
};

const createContact = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const age = req.body.age;
  const posts = req.body.posts ?? [];
  if (!firstName || !lastName || !email || !age) {
    res.status(400).send("Required parameter was not defined");
  } else {
    try {
      const result = await getDb().db().collection("users").insertOne({
        firstName,
        lastName,
        email,
        age,
        posts,
      });
      res.status(201).json(result);
    } catch (e) {
      res.status(500).json(response.error ?? "There was an error.");
      console.error(e);
    }
  }
};

const updateOne = async (req, res, next) => {
  const _id = new ObjectId(req.params.id);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const age = req.body.age;
  const posts = req.body.posts ?? [];
  if (!firstName || !lastName || !email || !age) {
    res.status(400).send("Required parameter was not defined");
  } else {
    const contact = {
      firstName,
      lastName,
      email,
      age,
      posts,
    };
    try {
      const result = await getDb()
        .db()
        .collection("users")
        .replaceOne({ _id }, contact);
      res.status(204).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e ?? "There was an error updating the contact.");
    }
  }
};
const deleteOne = async (req, res, next) => {
  const _id = new ObjectId(req.params.id);
  try {
    const result = await getDb().db().collection("users").deleteOne({ _id });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e ?? "There was an error updating the contact.");
  }
};

module.exports = { createContact, deleteOne, getAll, getOne, updateOne };
