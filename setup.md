# Quick Setup Guide

## 🚀 Getting Started

### 1. Backend Setup

First, set up the backend API:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
```

Edit the `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 2. Start Backend

```bash
# Start the development server
npm run dev

# In a new terminal, seed the database
npm run seed
```

### 3. Start Frontend

```bash
# Navigate back to project root
cd ..

# Start the frontend development server
npm run dev
```

### 4. Access Your Portfolio

- **Portfolio**: http://localhost:5173
- **Dashboard Login**: http://localhost:5173/login
- **Default Login**: admin@portfolio.com / admin123

## 📝 What's New

### Dynamic Features
- ✅ **Dashboard**: Manage projects and skills through a web interface
- ✅ **API Integration**: All content is now fetched from the backend
- ✅ **Authentication**: Secure login system for dashboard access
- ✅ **File Upload**: Upload project images directly from the dashboard
- ✅ **Real-time Updates**: Changes in dashboard reflect immediately on portfolio

### Backend API
- ✅ **Projects CRUD**: Create, read, update, delete projects
- ✅ **Skills Management**: Manage skills with categories and levels
- ✅ **User Authentication**: JWT-based authentication
- ✅ **File Upload**: Image upload functionality
- ✅ **Database**: MongoDB with Mongoose ODM

### Frontend Enhancements
- ✅ **Routing**: React Router for navigation
- ✅ **State Management**: Context API for authentication
- ✅ **API Integration**: Axios for backend communication
- ✅ **Toast Notifications**: User feedback with react-hot-toast
- ✅ **TypeScript**: Better type safety

## 🎯 Next Steps

1. **Customize Content**: Update the portfolio content through the dashboard
2. **Add Projects**: Use the dashboard to add your own projects
3. **Manage Skills**: Update your skills and proficiency levels
4. **Deploy**: Deploy both frontend and backend to your preferred platforms

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running locally
- Or use MongoDB Atlas (cloud) and update the connection string

### Port Conflicts
- Backend runs on port 5000
- Frontend runs on port 5173
- Make sure these ports are available

### API Connection Issues
- Check that the backend is running
- Verify the API URL in the frontend environment variables
- Check CORS settings in the backend

## 📚 Additional Resources

- [MongoDB Setup](https://docs.mongodb.com/manual/installation/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Your dynamic portfolio is ready! 🎉**
