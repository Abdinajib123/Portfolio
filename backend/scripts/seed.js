import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

dotenv.config();

const connectDB = async () => {
  try {
    // Use the same MongoDB URI as the server if .env is missing
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://ifraaxcabdullahi795:ifraax123@cluster0.bpqv4lj.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ email: 'admin@portfolio.com' });
    if (existingUser) {
      console.log('Admin user already exists, skipping...');
      return existingUser;
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created:', adminUser.email);
    return adminUser;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedProjects = async () => {
  try {
    // Check if projects already exist
    const existingProjects = await Project.countDocuments();
    if (existingProjects > 0) {
      console.log('Projects already exist, skipping...');
      return;
    }

    const projects = [
      {
        title: 'Quran App',
        description: 'A beautiful and interactive React.js application designed to explore and engage with the Quran. Features include audio recitations, chapter navigation, and responsive design.',
        image: '/images/quran.png',
        technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/Abdinajib123/QuraanApp.git',
        live: 'https://quraan-app-one.vercel.app/',
        featured: true,
        order: 1,
        category: 'web'
      },
      {
        title: 'Coffee App',
        description: 'A Flutter-based mobile application for coffee shop management and ordering. Features include user authentication, menu management, and order processing.',
        image: '/images/coffe.jpg',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'],
        github: 'https://github.com/Abdinajib123/coffeApp.git',
        live: 'https://github.com/Abdinajib123/coffeApp.git',
        featured: true,
        order: 2,
        category: 'mobile'
      },
      {
        title: 'E-commerce Website',
        description: 'A full-stack e-commerce platform with modern features including user authentication, product management, shopping cart, and secure payment processing.',
        image: '/images/image.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
        github: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
        live: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
        featured: true,
        order: 3,
        category: 'web'
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded successfully');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const seedSkills = async () => {
  try {
    // Check if skills already exist
    const existingSkills = await Skill.countDocuments();
    if (existingSkills > 0) {
      console.log('Skills already exist, skipping...');
      return;
    }

    const skills = [
      // Frontend
      { name: 'React', level: 90, category: 'frontend', icon: '⚛️', order: 1 },
      { name: 'TypeScript', level: 85, category: 'frontend', icon: '📘', order: 2 },
      { name: 'JavaScript', level: 90, category: 'frontend', icon: '🟨', order: 3 },
      { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🌐', order: 4 },
      { name: 'Tailwind CSS', level: 88, category: 'frontend', icon: '🎨', order: 5 },
      { name: 'Next.js', level: 80, category: 'frontend', icon: '⚡', order: 6 },
      
      // Backend
      { name: 'Node.js', level: 85, category: 'backend', icon: '🟢', order: 1 },
      { name: 'Express.js', level: 80, category: 'backend', icon: '🚂', order: 2 },
      { name: 'Python', level: 75, category: 'backend', icon: '🐍', order: 3 },
      { name: 'Java', level: 70, category: 'backend', icon: '☕', order: 4 },
      { name: 'REST APIs', level: 90, category: 'backend', icon: '🔗', order: 5 },
      { name: 'GraphQL', level: 75, category: 'backend', icon: '📊', order: 6 },
      
      // Database
      { name: 'MongoDB', level: 85, category: 'database', icon: '🍃', order: 1 },
      { name: 'PostgreSQL', level: 80, category: 'database', icon: '🐘', order: 2 },
      { name: 'Firebase', level: 85, category: 'database', icon: '🔥', order: 3 },
      { name: 'SQL', level: 70, category: 'database', icon: '🗄️', order: 4 },
      { name: 'Docker', level: 75, category: 'database', icon: '🐳', order: 5 },
      { name: 'Redis', level: 70, category: 'database', icon: '🔴', order: 6 },
      
      // UI/UX
      { name: 'Figma', level: 80, category: 'ui-ux', icon: '🎨', order: 1 },
      { name: 'Adobe XD', level: 75, category: 'ui-ux', icon: '📐', order: 2 },
      { name: 'Photoshop', level: 70, category: 'ui-ux', icon: '🖼️', order: 3 },
      { name: 'Illustrator', level: 65, category: 'ui-ux', icon: '✏️', order: 4 },
      { name: 'Prototyping', level: 85, category: 'ui-ux', icon: '📱', order: 5 },
      { name: 'User Research', level: 75, category: 'ui-ux', icon: '🔍', order: 6 },
      
      // Mobile
      { name: 'React Native', level: 80, category: 'mobile', icon: '📱', order: 1 },
      { name: 'Flutter', level: 70, category: 'mobile', icon: '🦋', order: 2 },
      { name: 'iOS Development', level: 65, category: 'mobile', icon: '🍎', order: 3 },
      { name: 'Android Development', level: 70, category: 'mobile', icon: '🤖', order: 4 },
      { name: 'Mobile UI/UX', level: 75, category: 'mobile', icon: '📲', order: 5 },
      { name: 'App Store Deployment', level: 80, category: 'mobile', icon: '🚀', order: 6 },
      
      // Tools
      { name: 'Git/GitHub', level: 90, category: 'tools', icon: '📚', order: 1 },
      { name: 'VS Code', level: 95, category: 'tools', icon: '💻', order: 2 },
      { name: 'Webpack', level: 75, category: 'tools', icon: '📦', order: 3 },
      { name: 'Jest', level: 80, category: 'tools', icon: '🧪', order: 4 },
      { name: 'CI/CD', level: 75, category: 'tools', icon: '🔄', order: 5 },
      { name: 'Agile/Scrum', level: 85, category: 'tools', icon: '📋', order: 6 }
    ];

    await Skill.insertMany(skills);
    console.log('Skills seeded successfully');
  } catch (error) {
    console.error('Error seeding skills:', error);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Starting database seeding...');
    
    await seedUsers();
    await seedProjects();
    await seedSkills();
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
