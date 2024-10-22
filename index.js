import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const mongoCollection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);
  const command = args[0];

  await mongoose.connect(mongoUri);

  const schema = new mongoose.Schema({}, { strict: false });
  const Model = mongoose.model(mongoCollection, schema);

  switch (command) {
    case 'check-db-connection':
      await checkConnection();
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
