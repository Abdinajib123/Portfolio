# Dynamic Portfolio with Dashboard

A modern, responsive portfolio website with a dynamic dashboard for managing projects and skills. Built with React, TypeScript, Tailwind CSS, and a Node.js backend.

## Features

### Frontend (Portfolio)
- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- ⚡ Fast loading with Vite
- 🔄 Dynamic content from API
- 🎯 SEO optimized

### Backend (API)
- 🔐 JWT Authentication
- 📊 MongoDB database
- 🖼️ File upload support
- 🛡️ Security middleware
- 📝 Input validation

### Dashboard
- 📊 Real-time statistics
- ➕ Add/Edit/Delete projects
- 🎯 Manage skills and categories
- 🖼️ Image upload functionality
- 🔄 Drag & drop reordering
- 👤 User profile management

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File uploads)
- Express Validator
- Helmet (Security)

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Portfolio
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Start the server
npm run dev

# Seed the database (optional)
npm run seed
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ..

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

- **Portfolio**: http://localhost:5173
- **Dashboard**: http://localhost:5173/login
- **API**: http://localhost:5000

## Default Credentials

After running the seed script, you can login with:
- **Email**: admin@portfolio.com
- **Password**: admin123

## Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PUT /api/projects/:id/toggle-featured` - Toggle featured status
- `PUT /api/projects/reorder` - Reorder projects

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `PUT /api/skills/reorder` - Reorder skills
- `POST /api/skills/bulk` - Bulk create skills

### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## Project Structure

```
Portfolio/
├── backend/                 # Backend API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database seeding
│   └── uploads/            # Uploaded files
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   └── ui/            # UI components
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── main.tsx           # App entry point
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## Dashboard Features

### Projects Management
- ✅ Add new projects with images
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Toggle featured status
- ✅ Reorder projects
- ✅ Upload project images

### Skills Management
- ✅ Add new skills with levels
- ✅ Edit skill information
- ✅ Delete skills
- ✅ Categorize skills
- ✅ Bulk import skills
- ✅ Reorder skills

### User Management
- ✅ Update profile information
- ✅ Change password
- ✅ View dashboard statistics

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**



