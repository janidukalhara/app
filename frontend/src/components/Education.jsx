import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { education } from '../data/mock';

const Education = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'Ongoing':
        return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  const achievements = [
    {
      title: "Advanced Level Excellence",
      description: "Achieved strong grades in ICT (B), Combined Mathematics (C), and Physics (C)",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      title: "Ordinary Level Outstanding Performance", 
      description: "Secured 8 A's including ICT, Science, Mathematics, and Commerce",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      title: "Technical Proficiency",
      description: "Strong foundation in ICT and analytical subjects from early education",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    }
  ];

  return (
    <section id="education" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Education & Qualifications
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Continuous learning and academic excellence in technology and business
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gray-900 border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>

                {/* Education Card */}
                <Card className="flex-1 ml-8 bg-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center text-gray-300 mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                          {edu.institution}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                          {edu.period}
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0">
                        <Badge className={getStatusColor(edu.status)}>
                          {edu.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar for Ongoing Education */}
                    {edu.status === 'Ongoing' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Progress</span>
                          <span>In Progress</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4 animate-pulse" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Achievements Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Academic Achievements</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {achievement.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-green-900/30 border-blue-500/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Current Academic Focus</h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Currently pursuing multiple qualifications to strengthen both technical expertise and business acumen. 
                Focusing on advanced software engineering concepts, full-stack development practices, and English 
                communication skills to excel in international software development environments.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">Computer Science</Badge>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">Software Engineering</Badge>
                <Badge className="bg-green-600/20 text-green-400 border-green-500/30">Full-Stack Development</Badge>
                <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30">English Literature</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;