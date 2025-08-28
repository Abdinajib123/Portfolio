import express from 'express';
import { body, validationResult } from 'express-validator';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }

    const limitNum = parseInt(limit);

    const skills = await Skill.find(query)
      .sort({ order: 1, level: -1 })
      .limit(limitNum);

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      skills,
      skillsByCategory
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/skills/categories
// @desc    Get skill categories (public)
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/skills/:id
// @desc    Get single skill (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findOne({ 
      _id: req.params.id, 
      isActive: true 
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private
router.post('/', protect, [
  body('name', 'Name is required').not().isEmpty(),
  body('level', 'Level must be a number between 0 and 100').isInt({ min: 0, max: 100 }),
  body('category', 'Category is required').isIn(['frontend', 'backend', 'database', 'ui-ux', 'mobile', 'tools', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', protect, [
  body('name', 'Name is required').not().isEmpty(),
  body('level', 'Level must be a number between 0 and 100').isInt({ min: 0, max: 100 }),
  body('category', 'Category is required').isIn(['frontend', 'backend', 'database', 'ui-ux', 'mobile', 'tools', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill removed' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/skills/reorder
// @desc    Reorder skills
// @access  Private
router.put('/reorder', protect, async (req, res) => {
  try {
    const { skills } = req.body; // Array of { id, order }

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const updatePromises = skills.map(({ id, order }) =>
      Skill.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({ message: 'Skills reordered successfully' });
  } catch (error) {
    console.error('Reorder skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/skills/bulk
// @desc    Create multiple skills
// @access  Private
router.post('/bulk', protect, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const createdSkills = await Skill.insertMany(skills);
    res.status(201).json(createdSkills);
  } catch (error) {
    console.error('Bulk create skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
