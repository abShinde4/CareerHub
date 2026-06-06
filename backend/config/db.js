import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  console.log('MONGO_URI:', mongoUri);

  if (!mongoUri) {
    console.error(`
MONGO_URI is undefined.

Why this happens:
  1. backend/.env file does not exist
  2. MONGO_URI is missing inside backend/.env
  3. dotenv could not find/load the .env file

Fix:
  1. Create file: backend/.env
  2. Add this line (replace with your Atlas credentials):

     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/careerhub?retryWrites=true&w=majority

  3. Get the URI from MongoDB Atlas:
     Database -> Connect -> Drivers -> copy connection string
  4. Replace <password> with your real password (no angle brackets)
  5. Add database name before query string: /careerhub

File must be placed at:
  ${process.cwd().includes('backend') ? process.cwd() : process.cwd() + '/backend'}/.env
`);
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    if (error.message.includes('authentication failed')) {
      console.error('Check username/password in MONGO_URI. Remove < > around password.');
    }
    if (error.message.includes('ENOTFOUND')) {
      console.error('Check cluster hostname in MONGO_URI.');
    }
    process.exit(1);
  }
};

export default connectDB;
