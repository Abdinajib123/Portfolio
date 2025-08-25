import { User, MapPin, Calendar, GraduationCap } from 'lucide-react';

const About = () => {
  const personalInfo = [
    { icon: User, label: 'Name', value: 'Abdinajib Abdullahi Muse' },
    { icon: MapPin, label: 'Location', value: 'Mogadishu, Somalia' },
    { icon: Calendar, label: 'Birthday', value: '2004' },
    { icon: GraduationCap, label: 'Degree', value: 'Bachelor of Computer Science' },
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get to know me better - my background, interests, and what drives me in the world of technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Personal Information
              </h3>
              <div className="grid gap-4">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
                    <div className="flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 font-medium">{info.label}</p>
                      <p className="text-foreground font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My Story
              </h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with a love for creating innovative digital solutions. 
                  My journey in technology began with curiosity and has evolved into a career focused on building 
                  user-centric applications that make a difference.
                </p>
                <p>
                  With expertise in modern web technologies like React, TypeScript, and Node.js, I enjoy 
                  tackling complex problems and turning them into elegant, scalable solutions. I believe in 
                  writing clean, maintainable code and staying up-to-date with the latest industry trends.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community. I'm always eager to learn and 
                  take on new challenges that push my boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
