import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  github: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*/.test(v);
      },
      message: 'GitHub URL must be a valid URL'
    }
  },
  live: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*/.test(v);
      },
      message: 'Live URL must be a valid URL'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'other'],
    default: 'web'
  },
  completionDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ featured: 1, order: 1, isActive: 1 });

export default mongoose.model('Project', projectSchema);
