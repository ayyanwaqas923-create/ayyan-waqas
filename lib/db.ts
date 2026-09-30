import { MongoClient, type Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectMongo() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const database = client.db("o-level-exam-coach-ai");
    cachedDb = database;
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection failed.", error);
    return null;
  }
}

export async function getDbOrNull() {
  return connectMongo();
}
