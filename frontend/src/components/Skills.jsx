import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { skills } from '../data/mock';

const Skills = () => {
  const skillIcons = {
    "Frontend Development": "💻",
    "Backend Development": "⚙️",
    "UI/UX Design": "🎨",
    "Business Analysis": "📊",
    "Database & Tools": "🔧"
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern digital solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{skillIcons[skillGroup.category]}</span>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Core Competencies</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { skill: "JavaScript/React", level: 90 },
              { skill: "PHP/Laravel", level: 85 },
              { skill: "Python", level: 80 },
              { skill: "MySQL/Database Design", level: 85 },
              { skill: "UI/UX Design", level: 75 },
              { skill: "Business Analysis", level: 80 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">{item.skill}</span>
                  <span className="text-blue-400">{item.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;