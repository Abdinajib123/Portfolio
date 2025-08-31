import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { skillsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const SkillForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 80
  });
  
  const [loading, setLoading] = useState(false);

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Database & Cloud',
    'UI/UX Design',
    'Mobile Development',
    'Other Tools'
  ];

  useEffect(() => {
    if (isEditing) {
      fetchSkill();
    }
  }, [id]);

  const fetchSkill = async () => {
    try {
      const response = await skillsAPI.getById(id);
      const skill = response.data;
      setFormData({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || 80
      });
    } catch (error) {
      console.error('Error fetching skill:', error);
      toast.error('Failed to load skill');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        await skillsAPI.update(id, formData);
        toast.success('Skill updated successfully! Redirecting to skills section...');
      } else {
        await skillsAPI.create(formData);
        toast.success('Skill created successfully! Redirecting to skills section...');
      }

      // Small delay to show success message before redirecting
      setTimeout(() => {
        navigate('/#skills');
      }, 1500);
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error.response?.data?.message || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Edit Skill' : 'Add New Skill'}
            </h1>
            <p className="text-foreground/70">
              {isEditing ? 'Update your skill details' : 'Add a new skill to your portfolio'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Skill Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Skill Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Skill Level: {formData.level}%
          </label>
          <input
            type="range"
            name="level"
            min="0"
            max="100"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-foreground/70 mt-1">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Proficiency Level</span>
            <span className="text-sm text-foreground/70">{formData.level}%</span>
          </div>
          <div className="w-full bg-accent rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${formData.level}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-foreground/70">
            {formData.level >= 90 && 'Expert level - You can teach others'}
            {formData.level >= 80 && formData.level < 90 && 'Advanced level - You can handle complex projects'}
            {formData.level >= 60 && formData.level < 80 && 'Intermediate level - You can work independently'}
            {formData.level >= 40 && formData.level < 60 && 'Basic level - You can contribute to projects'}
            {formData.level < 40 && 'Beginner level - You are learning'}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : (isEditing ? 'Update Skill' : 'Create Skill')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
