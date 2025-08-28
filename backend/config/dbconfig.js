import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔗 Attempting MongoDB connection...');
    console.log('Using MongoDB URI:', process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.error('💡 MongoDB Connection Tips:');
    console.error('   1. Check your internet connection');
    console.error('   2. Verify MongoDB Atlas cluster is running');
    console.error('   3. Check if IP is whitelisted in MongoDB Atlas');
    console.error('   4. Verify username/password in connection string');
    process.exit(1);
  }
};

export default connectDB;