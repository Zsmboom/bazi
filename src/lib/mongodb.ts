import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Server selection timeout
  socketTimeoutMS: 45000, // How long a socket can be idle before closing
  connectTimeoutMS: 10000 // Connection timeout
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse MongoDB connection in development mode
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Create new MongoDB connection for each request in production environment
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 