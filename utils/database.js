// db.js

import { MongoClient } from 'mongodb';

const MONGODB_URL = 'mongodb+srv://mouelhianais26:6TRwv6QePvk2CZPR@cluster0.amlktsc.mongodb.net/todoListApp';
const MONGODB_DB = 'todoListApp';

const url = MONGODB_URL;
const dbName = MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = { connectToDatabase };