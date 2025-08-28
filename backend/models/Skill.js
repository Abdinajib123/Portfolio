import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Level must be at least 0'],
    max: [100, 'Level cannot exceed 100']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'database', 'ui-ux', 'mobile', 'tools', 'other']
  },
  icon: {
    type: String,
    default: '💻'
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
skillSchema.index({ category: 1, order: 1, isActive: 1 });

export default mongoose.model('Skill', skillSchema);
