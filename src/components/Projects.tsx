import { Button } from './ui/button';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Quran App',
      description: 'A beautiful and interactive React.js application designed to explore and engage with the Quran. Features include audio recitations, chapter navigation, and responsive design.',
      image: '/images/quran.png',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
      github: 'https://github.com/Abdinajib123/QuraanApp.git',
      live: 'https://quraan-app-one.vercel.app/',
    },
    {
      id: 2,
      title: 'Coffee App',
      description: 'A Flutter-based mobile application for coffee shop management and ordering. Features include user authentication, menu management, and order processing.',
      image: '/images/coffe.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'],
      github: 'https://github.com/Abdinajib123/coffeApp.git',
      live: 'https://github.com/Abdinajib123/coffeApp.git',
    },
    {
      id: 3,
      title: 'E-commerce Website',
      description: 'A full-stack e-commerce platform with modern features including user authentication, product management, shopping cart, and secure payment processing.',
      image: '/images/image.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      github: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
      live: 'https://github.com/e-commerce-system-full-stuck/e-commerce-client.git',
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-accent/5 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
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
