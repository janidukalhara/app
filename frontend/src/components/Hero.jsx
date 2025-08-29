import React from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&cs=tinysrgb"
                alt="Janidu Kalhara Perera"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 mb-6 font-light">
            {personalInfo.title}
          </p>
          
          {/* Bio */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToAbout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Explore My Work
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              Download CV
              <Download className="ml-2 w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              onClick={() => window.open(personalInfo.currentPortfolio, '_blank')}
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              Current Portfolio
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Location */}
          <p className="text-gray-400 text-sm">
            📍 {personalInfo.location}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToAbout}
          className="animate-bounce text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;