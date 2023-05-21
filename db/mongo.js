const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGODB_CONNECTION_URL || "";
let db;

const initDb = (callback) => {
  if (db) {
    console.log("Database is already initialized!");
    return callback(null, db);
  }
  MongoClient.connect(connectionString)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((e) => callback(e));
};

const getDb = () => {
  if (!db) throw Error("Database not initialized!");
  return db;
};

module.exports = { initDb, getDb };
