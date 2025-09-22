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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Content with higher z-index to appear above 3D background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl backdrop-blur-sm bg-black/20">
              <img 
                src="/images/profile.jpg"
                alt="Janidu Kalhara Perera"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 mb-6 font-light drop-shadow-md">
            {personalInfo.title}
          </p>
          
          {/* Bio */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-lg border border-white/10">
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToAbout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Explore My Work
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300 backdrop-blur-sm bg-black/20 border-2 shadow-lg"
            >
              Download CV
              <Download className="ml-2 w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              onClick={() => window.open(personalInfo.currentPortfolio, '_blank')}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-3 text-lg font-medium transition-all duration-300 backdrop-blur-sm"
            >
              Current Portfolio
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Location */}
          <p className="text-gray-400 text-sm backdrop-blur-sm bg-black/20 inline-block px-4 py-2 rounded-full">
            📍 {personalInfo.location}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={scrollToAbout}
          className="animate-bounce text-gray-400 hover:text-white transition-colors duration-200 backdrop-blur-sm bg-black/20 p-3 rounded-full"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;