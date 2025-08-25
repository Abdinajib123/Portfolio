import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-accent/5 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-2">Your Name</h3>
            <p className="text-foreground/70 text-sm">
              Full Stack Developer passionate about creating amazing digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                Home
              </a>
              <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                About
              </a>
              <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                Projects
              </a>
              <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                Skills
              </a>
              <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-lg border border-border hover:bg-accent transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Your Name. All rights reserved. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
