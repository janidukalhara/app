import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';
import { Helmet } from 'react-helmet-async';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' }
  ];

  const resources = [
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume/CV', href: '#' },
    { name: 'Current Portfolio', href: personalInfo.currentPortfolio }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <Helmet>
        <title>Janidu Kalhara Perera – Full-Stack Software Engineer & Business Analyst</title>
        <meta
          name="description"
          content="Professional portfolio of Janidu Kalhara Perera – Full-Stack Software Engineer & Business Analyst. Showcasing React, Three.js, FastAPI backend projects, and modern UX solutions."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Janidu Kalhara Perera",
            "jobTitle": "Full-Stack Software Engineer & Business Analyst",
            "url": personalInfo.currentPortfolio,
            "sameAs": [
              personalInfo.github,
              `https://${personalInfo.linkedin}`
            ],
            "email": personalInfo.email,
            "description": "Passionate about creating innovative digital solutions that bridge the gap between business needs and technical excellence.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sri Lanka"
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Janidu Kalhara Perera
              </h3>
              <p className="text-blue-400 font-medium mb-4">
                Software Engineer & Full-Stack Developer
              </p>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Passionate about creating innovative digital solutions that bridge the gap 
              between business needs and technical excellence. Let's build something amazing together.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={`https://${personalInfo.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  {resource.href.startsWith('#') ? (
                    <button 
                      onClick={() => {
                        if (resource.href === '#') return;
                        const element = document.querySelector(resource.href);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {resource.name}
                    </button>
                  ) : (
                    <a 
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {resource.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Janidu Kalhara Perera. Made with </span>
              <Heart className="w-4 h-4 text-red-500 mx-1 fill-red-500" />
              <span>in Sri Lanka</span>
            </div>

            {/* Back to Top */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              Back to top
              <ArrowUp className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
