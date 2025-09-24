import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Filter, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { projectService } from '../services/api';
import { projects as mockProjects, projectCategories } from '../data/mock';
import { Helmet } from 'react-helmet-async';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [activeCategory]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectData = await projectService.getProjects({ category: activeCategory });

      if (projectData && projectData.length > 0) {
        setProjects(projectData);
      } else {
        const filteredMockProjects = activeCategory === 'All'
          ? mockProjects
          : mockProjects.filter(project => project.category === activeCategory);
        setProjects(filteredMockProjects);
      }
    } catch {
      const filteredMockProjects = activeCategory === 'All'
        ? mockProjects
        : mockProjects.filter(project => project.category === activeCategory);
      setProjects(filteredMockProjects);
    } finally {
      setLoading(false);
    }
  };

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-900/80 backdrop-blur-sm">
      <Helmet>
        <title>Portfolio Projects – Janidu Kalhara Perera | React, FastAPI & 3D Web Work</title>
        <meta
          name="description"
          content="Explore Janidu Kalhara Perera’s portfolio projects built with React, FastAPI, and MongoDB. Featuring 3D animations, responsive design, and real database integrations."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Portfolio Projects",
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": project.live_url || project.liveUrl,
              "name": project.title,
              "image": project.image,
              "description": project.description,
              "keywords": project.technologies.join(", ")
            }))
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my work in full-stack development and business solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center text-gray-400 mb-2 md:mb-0">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {projectCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              disabled={loading}
              className={`transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform scale-105'
                  : 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 backdrop-blur-sm bg-gray-800/50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-300">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Featured Projects Showcase */}
            {activeCategory === 'All' && featuredProjects.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">⭐ Featured Work</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredProjects.map((project) => (
                    <Card key={project.id} className="bg-gray-800/80 border-gray-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h4>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                            {project.category}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                            onClick={() => window.open(project.github_url || project.githubUrl, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                            onClick={() => window.open(project.live_url || project.liveUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="bg-gray-800/80 border-gray-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500 text-yellow-900 shadow-lg">⭐ Featured</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h4>
                      <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                        onClick={() => window.open(project.github_url || project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(project.live_url || project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projects.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No projects found for this category.</p>
                <Button 
                  onClick={() => setActiveCategory('All')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  View All Projects
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
