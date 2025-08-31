import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { projectsAPI } from '../services/api';

interface Project {
  _id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  featured?: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    fetchProjects();
    
    // Check if we're coming from admin dashboard (hash in URL)
    if (window.location.hash === '#projects') {
      setIsHighlighted(true);
      // Remove highlight after 3 seconds
      setTimeout(() => setIsHighlighted(false), 3000);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll({ limit: 10 });
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to static data if API fails
      setProjects([
        {
          _id: 1,
          title: 'Quran App',
          description: 'A beautiful and interactive React.js application designed to explore and engage with the Quran. Features include audio recitations, chapter navigation, and responsive design.',
          image: '/images/quran.png',
          technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
          github: 'https://github.com/Abdinajib123/QuraanApp.git',
          live: 'https://quraan-app-one.vercel.app/',
        },
        {
          _id: 2,
          title: 'Coffee shop Website',
          description: 'A modern, responsive coffee shop website built with React and TypeScript. Features include online menu browsing, coffee ordering, store locations, and a beautiful user interface showcasing premium coffee products.',
          image: '/images/image.png',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
          github: 'https://github.com/Abdinajib123/Coffee-Website.git',
          live: 'https://coffee-website-lime.vercel.app/',
        },
        {
          _id: 3,
          title: 'E-commerce Website',
          description: 'A full-stack e-commerce platform with modern features including user authentication, product management, shopping cart, and secure payment processing.',
          image: '/images/3.png',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
          github: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
          live: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="projects" 
      className={`min-h-screen py-20 bg-background transition-all duration-1000 ${
        isHighlighted ? 'ring-4 ring-primary/20 bg-primary/5' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
            {isHighlighted && (
              <span className="ml-2 text-sm text-primary animate-pulse">
                ✨ Just Updated!
              </span>
            )}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="group bg-accent/5 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log(`Image failed to load: ${project.image}`);
                      // Fallback to emoji if image doesn't load
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (target && fallback) {
                        target.style.display = 'none';
                        fallback.style.display = 'flex';
                      }
                    }}
                    onLoad={() => {
                      console.log(`Image loaded successfully: ${project.image}`);
                    }}
                  />
                  <div className="text-4xl text-primary/20 hidden">☕</div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                <p className="text-foreground/70 mb-3 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-accent text-foreground text-xs rounded-full font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/Abdinajib123/" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
