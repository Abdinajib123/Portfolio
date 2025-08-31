import { useState, useEffect } from 'react';
import { Code, Database, Palette, Server, Smartphone, Globe } from 'lucide-react';
import { skillsAPI } from '../services/api';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  skills: Skill[];
}

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    fetchSkills();
    
    // Check if we're coming from admin dashboard (hash in URL)
    if (window.location.hash === '#skills') {
      setIsHighlighted(true);
      // Remove highlight after 3 seconds
      setTimeout(() => setIsHighlighted(false), 3000);
    }
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getAll();
      const skills = response.data.skills || [];
      
      // Group skills by category
      const groupedSkills = skills.reduce((acc: any, skill: Skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      }, {});

      // Map categories to icons
      const categoryIcons: { [key: string]: any } = {
        'Frontend Development': Code,
        'Backend Development': Server,
        'Database & Cloud': Database,
        'UI/UX Design': Palette,
        'Mobile Development': Smartphone,
        'Other Tools': Globe,
      };

      const categories = Object.entries(groupedSkills).map(([category, skills]: [string, any], index) => ({
        id: index.toString(),
        title: category,
        icon: categoryIcons[category] || Globe,
        skills: skills,
      }));

      setSkillCategories(categories);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to static data if API fails
      setSkillCategories([
        {
          id: '1',
          title: 'Frontend Development',
          icon: Code,
          skills: [
            { _id: '1', name: 'React', level: 90, category: 'Frontend Development' },
            { _id: '2', name: 'TypeScript', level: 85, category: 'Frontend Development' },
            { _id: '3', name: 'JavaScript', level: 90, category: 'Frontend Development' },
            { _id: '4', name: 'HTML/CSS', level: 95, category: 'Frontend Development' },
          ],
        },
        {
          id: '2',
          title: 'Backend Development',
          icon: Server,
          skills: [
            { _id: '5', name: 'Node.js', level: 85, category: 'Backend Development' },
            { _id: '6', name: 'Express.js', level: 80, category: 'Backend Development' },
            { _id: '7', name: 'Python', level: 75, category: 'Backend Development' },
            { _id: '8', name: 'REST APIs', level: 90, category: 'Backend Development' },
          ],
        },
        {
          id: '3',
          title: 'Database & Cloud',
          icon: Database,
          skills: [
            { _id: '9', name: 'MongoDB', level: 85, category: 'Database & Cloud' },
            { _id: '10', name: 'PostgreSQL', level: 80, category: 'Database & Cloud' },
            { _id: '11', name: 'Firebase', level: 85, category: 'Database & Cloud' },
            { _id: '12', name: 'Docker', level: 75, category: 'Database & Cloud' },
          ],
        },
        {
          id: '4',
          title: 'Other Tools',
          icon: Globe,
          skills: [
            { _id: '13', name: 'Git/GitHub', level: 90, category: 'Other Tools' },
            { _id: '14', name: 'VS Code', level: 95, category: 'Other Tools' },
            { _id: '15', name: 'Jest', level: 80, category: 'Other Tools' },
            { _id: '16', name: 'CI/CD', level: 75, category: 'Other Tools' },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <section id="skills" className="min-h-screen py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      className={`min-h-screen py-20 bg-accent/5 transition-all duration-1000 ${
        isHighlighted ? 'ring-4 ring-primary/20 bg-primary/10' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
            {isHighlighted && (
              <span className="ml-2 text-sm text-primary animate-pulse">
                ✨ Just Updated!
              </span>
            )}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Here's an overview of my technical skills and the technologies I work with on a daily basis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.slice(0, 4).map((category) => (
            <div key={category.id} className="bg-background rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.slice(0, 4).map((skill, index) => (
                  <div key={skill._id || index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-foreground/60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${getLevelColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Additional Skills
            </h3>
            <p className="text-foreground/70">
              Beyond technical skills, I also bring soft skills and professional expertise to the table.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-xl border border-border text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Problem Solving</h4>
              <p className="text-foreground/70 text-sm">
                Strong analytical and problem-solving skills with a track record of delivering innovative solutions.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Team Collaboration</h4>
              <p className="text-foreground/70 text-sm">
                Excellent communication skills and experience working in agile development teams.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border text-center">
              <div className="text-3xl mb-4">📚</div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Continuous Learning</h4>
              <p className="text-foreground/70 text-sm">
                Passionate about staying updated with the latest technologies and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
