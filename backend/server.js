import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with explicit path
const envPath = path.resolve(__dirname, '.env');
console.log('📁 Looking for .env file at:', envPath);

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  dotenv.config({ path: envPath });
} else {
  console.log('❌ .env file NOT found at:', envPath);
  console.log('📂 Current directory contents:', fs.readdirSync(__dirname));
}

// Debug: Check loaded environment variables
console.log('🔍 Environment variables after loading:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Missing');
console.log('PORT:', process.env.PORT || '❌ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || '❌ Missing');

// Import database connection
import connectDB from './config/dbconfig.js';

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Static files
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Test environment variables endpoint
app.get('/api/env-test', (req, res) => {
  res.json({
    mongodb_uri: process.env.MONGODB_URI ? 'Loaded' : 'Not loaded',
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    cors_origin: process.env.CORS_ORIGIN
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    console.log('🔧 Starting server...');
    
    // If .env file is missing, use hardcoded values for testing
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  Using hardcoded MongoDB URI for testing');
      process.env.MONGODB_URI = 'mongodb+srv://ifraaxcabdullahi795:ifraax123@cluster0.bpqv4lj.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0';
      process.env.PORT = process.env.PORT || '5000';
      process.env.NODE_ENV = process.env.NODE_ENV || 'development';
      process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
    }
    
    // Connect to database
    await connectDB();
    
    // Start listening
    app.listen(PORT, () => {
      console.log('✅ Server started successfully!');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 CORS Origin: ${process.env.CORS_ORIGIN}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();