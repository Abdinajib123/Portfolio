import React from 'react';
import { Button } from './ui/button';
import { Download, Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#0A192F] text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section - Left Side */}
          <div className="relative flex justify-center items-center lg:justify-start">
            <div
              className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                boxShadow: '0 0 30px rgba(0, 191, 255, 0.7), 0 0 60px rgba(0, 191, 255, 0.5)', // Glowing blue effect
                border: '2px solid rgba(0, 191, 255, 0.8)', // Border for the glow
              }}
            >
              <img
                src="public/images/profile.jpg"
                alt="Abdinajib - Professional headshot"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't load
                  e.currentTarget.src = '/images/profile.svg';
                }}
              />
            </div>
          </div>

          {/* Content Section - Right Side */}
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-lg text-gray-300">Hello, I'm</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              Abdinajib
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-200">
              And I'm a Full-stack Developer, Mobile App Developer, UI/UX & Graphic Designer
            </p>
            <p className="text-base text-gray-400 max-w-lg mx-auto lg:mx-0 pt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Essentia iusto tempore possimus voluptates quis necessitatibus, cupiditate explicabo sed a perferendis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <Button className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </Button>
              <Button variant="outline" className="px-6 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Mail className="mr-2 h-5 w-5" /> Get In Touch
              </Button>
            </div>
            <div className="flex gap-4 pt-4 justify-center lg:justify-start">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Github className="h-7 w-7" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
