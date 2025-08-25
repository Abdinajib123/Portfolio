import React from 'react';
import { Button } from './ui/button';
import { Download, Mail, Github, Linkedin, Facebook, Instagram } from 'lucide-react';

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
                src="/images/1.jpg"
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
              Passionate about creating innovative digital solutions that combine cutting-edge technology with exceptional user experiences. With expertise in full-stack development, mobile applications, and creative design, I bring ideas to life through code and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <Button className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </Button>
              <Button variant="outline" className="px-6 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Mail className="mr-2 h-5 w-5" /> Get In Touch
              </Button>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-4 pt-6 justify-center lg:justify-start">
              <a 
                href="https://www.facebook.com/najiib.cadeh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                title="Facebook"
              >
                <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-colors">
                  <Facebook className="h-6 w-6 text-white" />
                </div>
              </a>
              
              <a 
                href="https://wa.me/612112932" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
                title="WhatsApp"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#22C55E] transition-colors">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/abdinajib-abdullahi-muse-8b8026357" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                title="LinkedIn"
              >
                <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#006097] transition-colors">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
              </a>
              
              <a 
                href="https://www.instagram.com/cabdicabdulaahi8899" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                title="Instagram"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#E4405F] to-[#C13584] rounded-full flex items-center justify-center hover:from-[#D63384] hover:to-[#B02A37] transition-all">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
