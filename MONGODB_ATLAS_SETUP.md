# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Create your account or sign in

## Step 2: Create a New Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Configure Your Environment

Create a `.env` file in the `backend` folder with the following content:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

**Important:** Replace the following in your connection string:
- `your_username` with your database username
- `your_password` with your database password
- `your_cluster` with your actual cluster name

## Step 7: Test the Connection

1. Save the `.env` file
2. Restart your backend server:
   ```bash
   cd backend
   npm start
   ```

3. You should see:
   ```
   ✅ MongoDB Connected: your-cluster.mongodb.net
   📊 Database: portfolio
   ```

## Step 8: Seed Initial Data (Optional)

The backend will automatically create an admin user, but you can also seed some sample data:

```bash
cd backend
npm run seed
```

## Troubleshooting

### Connection Issues
- Make sure your IP address is whitelisted in Network Access
- Verify your username and password are correct
- Check that your cluster is running

### Authentication Issues
- Ensure your database user has the correct permissions
- Verify the connection string format

### Common Errors
- `ECONNREFUSED`: Check network access settings
- `Authentication failed`: Verify username/password
- `Server selection timeout`: Check cluster status

## Security Notes

1. **Never commit your `.env` file** to version control
2. **Change the JWT_SECRET** in production
3. **Use environment-specific connection strings** for different environments
4. **Restrict network access** to specific IPs in production

## Production Setup

For production deployment:
1. Use a paid MongoDB Atlas cluster
2. Set up proper network security rules
3. Use strong, unique passwords
4. Enable MongoDB Atlas security features
5. Set up monitoring and alerts
