import React from 'react';
import { Code, Database, Palette, Server, Smartphone, Globe } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Next.js', level: 80 },
      ],
    },
    {
      id: 2,
      title: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Java', level: 70 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      id: 3,
      title: 'Database & Cloud',
      icon: Database,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Firebase', level: 85 },
        { name: 'AWS', level: 70 },
        { name: 'Docker', level: 75 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      id: 4,
      title: 'UI/UX Design',
      icon: Palette,
      skills: [
        { name: 'Figma', level: 80 },
        { name: 'Adobe XD', level: 75 },
        { name: 'Photoshop', level: 70 },
        { name: 'Illustrator', level: 65 },
        { name: 'Prototyping', level: 85 },
        { name: 'User Research', level: 75 },
      ],
    },
    {
      id: 5,
      title: 'Mobile Development',
      icon: Smartphone,
      skills: [
        { name: 'React Native', level: 80 },
        { name: 'Flutter', level: 70 },
        { name: 'iOS Development', level: 65 },
        { name: 'Android Development', level: 70 },
        { name: 'Mobile UI/UX', level: 75 },
        { name: 'App Store Deployment', level: 80 },
      ],
    },
    {
      id: 6,
      title: 'Other Tools',
      icon: Globe,
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Webpack', level: 75 },
        { name: 'Jest', level: 80 },
        { name: 'CI/CD', level: 75 },
        { name: 'Agile/Scrum', level: 85 },
      ],
    },
  ];

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section id="skills" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Here's an overview of my technical skills and the technologies I work with on a daily basis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div key={category.id} className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-sm text-foreground/60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${getLevelColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50">Proficiency Level</span>
                      <span className={`font-medium ${getLevelColor(skill.level).replace('bg-', 'text-')}`}>
                        {getLevelText(skill.level)}
                      </span>
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
              Additional Skills & Certifications
            </h3>
            <p className="text-foreground/70">
              Beyond technical skills, I also bring soft skills and professional certifications to the table.
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

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'AWS Certified Developer',
              'MongoDB Certified Developer',
              'React Developer Certification',
              'Google Cloud Platform',
            ].map((cert, index) => (
              <div key={index} className="bg-background p-4 rounded-lg border border-border hover:bg-accent transition-colors duration-200">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-foreground font-medium text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
