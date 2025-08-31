import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Search,
  Code
} from 'lucide-react';
import { skillsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getAll();
      setSkills(response.data.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id);
        toast.success('Skill deleted successfully');
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        toast.error('Failed to delete skill');
      }
    }
  };

  const getLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getLevelText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Basic';
    return 'Beginner';
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  const filteredSkills = skills.filter(skill =>
    (selectedCategory === '' || skill.category === selectedCategory) &&
    (skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     skill.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground/70">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Skills</h1>
            <p className="text-foreground/70">Manage your portfolio skills</p>
          </div>
        </div>
        <Button asChild>
          <Link to="/dashboard/skills/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💻</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchTerm || selectedCategory ? 'No skills found' : 'No skills yet'}
          </h3>
          <p className="text-foreground/70 mb-6">
            {searchTerm || selectedCategory ? 'Try adjusting your filters' : 'Get started by adding your first skill'}
          </p>
          {!searchTerm && !selectedCategory && (
            <Button asChild>
              <Link to="/dashboard/skills/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Proficiency Level
                      </span>
                      <span className="text-sm text-foreground/70">
                        {skill.level}% - {getLevelText(skill.level)}
                      </span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/dashboard/skills/${skill._id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(skill._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {filteredSkills.length > 0 && (
        <div className="bg-accent/10 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {filteredSkills.length}
              </div>
              <div className="text-sm text-foreground/70">Total Skills</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {categories.length}
              </div>
              <div className="text-sm text-foreground/70">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(filteredSkills.reduce((sum, skill) => sum + skill.level, 0) / filteredSkills.length)}
              </div>
              <div className="text-sm text-foreground/70">Avg Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {filteredSkills.filter(skill => skill.level >= 80).length}
              </div>
              <div className="text-sm text-foreground/70">Advanced+</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
