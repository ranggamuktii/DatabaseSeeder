import mongoose from 'mongoose';
import fs from 'fs';
import seed from './seed.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const mongoCollection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);
  const command = args[0];

  await mongoose.connect(mongoUri);

  const schema = new mongoose.Schema(
    {
      title: String,
      year: Number,
      genre: [String],
      description: String,
      director: String,
      cast: [String],
    },
    { strict: false }
  );

  const MovieModel = mongoose.model(mongoCollection, schema);

  switch (command) {
    case 'check-db-connection':
      await checkConnection();
      break;
    case 'reset-db':
      break;
    case 'bulk-insert':
      await MovieModel.insertMany(seed);
      break;
    default:
      throw Error('command not found');
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log('check db connection started...');
  try {
    await mongoose.connection.db.admin().ping();
    console.log('Successfully connected to Atlas');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
  console.log('check db connection ended...');
}

main();
