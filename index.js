require('dotenv').config();
const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const mongoUri = process.env.MONGODB_URI;

// Connect to your Atlas cluster
const client = new MongoClient(mongoUri);

async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to Atlas');
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
