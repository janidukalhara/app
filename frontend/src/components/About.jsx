import React from 'react';
import { Code, Users, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { personalInfo } from '../data/mock';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "Full-Stack Development",
      description: "Expert in modern web technologies including React, Laravel, and Python"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Business Analysis",
      description: "Bridge the gap between business needs and technical solutions"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Team Collaboration",
      description: "Experience in Agile methodologies and cross-functional team work"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Problem Solving",
      description: "Critical thinking and innovative solutions for complex challenges"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <Helmet>
        <title>About Me – Janidu Kalhara Perera | Full-Stack Developer & Business Analyst</title>
        <meta
          name="description"
          content="Learn more about Janidu Kalhara Perera, a Full-Stack Developer and Business Analyst with expertise in React, FastAPI, Python, Laravel, and data-driven solutions."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": personalInfo.name,
            "url": personalInfo.website,
            "image": personalInfo.profileImage,
            "sameAs": personalInfo.socials, 
            "jobTitle": "Full-Stack Developer & Business Analyst",
            "worksFor": {
              "@type": "Organization",
              "name": personalInfo.company || "Freelance"
            },
            "description": "Proactive Software Engineer and Business Analyst proficient in React, FastAPI, Python, Laravel, and data-driven solutions.",
            "alumniOf": personalInfo.education || "Computer Science Studies",
            "knowsAbout": ["Web Development", "Business Analysis", "AI", "Big Data", "Process Automation"]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating innovative solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
              <p>
                I'm <span className="text-blue-400 font-semibold">{personalInfo.name}</span>, 
                a proactive Software Engineer and aspiring Business Analyst with a strong foundation 
                in web development, user experience design, and data-driven decision-making.
              </p>
              <p>
                With proficiency in modern technologies like React, Laravel, Python, and MySQL, 
                I build responsive, user-focused web applications while managing complex backend 
                logic and databases.
              </p>
              <p>
                My unique combination of technical expertise and business analysis skills allows 
                me to effectively bridge the gap between business requirements and technical 
                solutions, ensuring deliverables align with organizational goals.
              </p>
              <p>
                Currently pursuing advanced studies in Computer Science, I'm passionate about 
                combining development and analysis to create <span className="text-blue-400 font-semibold">
                smart, scalable, and impactful digital solutions</span> - especially in domains 
                involving AI, big data, and process automation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                Available for Projects
              </div>
              <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                Open to Opportunities
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group hover:border-blue-500/50">
                <CardContent className="p-6">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
