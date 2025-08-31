# Quick MongoDB Atlas Setup

## 🚀 Quick Start

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select cloud provider & region
   - Click "Create"

3. **Set Up Access**
   - **Database Access**: Create user with password
   - **Network Access**: Allow access from anywhere (0.0.0.0/0)

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

5. **Create .env File**
   Create `backend/.env` with:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   MAX_FILE_SIZE=5242880
   ```

6. **Test Connection**
   ```bash
   cd backend
   npm start
   ```

7. **Seed Database** (Optional)
   ```bash
   npm run seed
   ```

## ✅ Success Indicators

You should see:
```
✅ MongoDB Connected: your-cluster.mongodb.net
📊 Database: portfolio
```

## 🔐 Admin Login

After setup:
- **Email**: admin@portfolio.com
- **Password**: admin123

## 🆘 Troubleshooting

- **Connection failed**: Check network access settings
- **Authentication failed**: Verify username/password
- **Server error**: Check cluster status

## 📚 Full Guide

See `MONGODB_ATLAS_SETUP.md` for detailed instructions.
