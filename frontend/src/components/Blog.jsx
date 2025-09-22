import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { blogService } from '../services/api';
import { blogPosts as mockBlogPosts } from '../data/mock';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await blogService.getBlogPosts({ per_page: 20 });

      if (response.posts && response.posts.length > 0) {
        setBlogPosts(response.posts);
      } else {
        // Fallback to mock data silently
        setBlogPosts(mockBlogPosts);
        console.log('Using mock blog data - no posts found in database');
      }
    } catch (err) {
      console.error('Failed to load blog posts:', err);
      // Fallback to mock data silently
      setBlogPosts(mockBlogPosts);
      console.log('Using mock blog data due to backend error');
      setError('Unable to fetch live posts, showing offline data.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Development':
        return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'Business Analysis':
        return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'Design':
        return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-300">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sharing knowledge and experiences in software development and business analysis
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {!selectedPost ? (
          <>
            {/* Featured Post */}
            {blogPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">📌 Featured Article</h3>
                <Card className="bg-gray-800/80 border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group backdrop-blur-sm">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={blogPosts[0].image} 
                        alt={blogPosts[0].title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={getCategoryColor(blogPosts[0].category)}>
                          {blogPosts[0].category}
                        </Badge>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(blogPosts[0].date)}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {blogPosts[0].read_time || blogPosts[0].readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                        {blogPosts[0].title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {blogPosts[0].excerpt}
                      </p>
                      
                      <Button 
                        onClick={() => setSelectedPost(blogPosts[0])}
                        className="w-fit bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}

            {/* Recent Posts */}
            {blogPosts.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Recent Posts</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.slice(1).map((post) => (
                    <Card key={post.id} className="bg-gray-800/80 border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-105 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h4>
                        
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.read_time || post.readTime}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="w-full border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-green-900/30 border-blue-500/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                    Get notified when I publish new articles about software development, 
                    business analysis, and technology trends.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          // Single Post View
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              className="mb-6 text-gray-300 hover:text-white backdrop-blur-sm hover:bg-gray-800/50"
            >
              ← Back to Blog
            </Button>
            
            <article className="bg-gray-800/80 border border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Badge className={getCategoryColor(selectedPost.category)}>
                    {selectedPost.category}
                  </Badge>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedPost.date)}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPost.read_time || selectedPost.readTime}
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                  
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {selectedPost.content ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    ) : (
                      <>
                        <p>
                          This is where the full article content would be displayed. 
                          In a real implementation, you would store the complete article 
                          content in your database and render it here with proper formatting, 
                          code syntax highlighting, and other rich content features.
                        </p>
                        
                        <p>
                          The blog system would also include features like comments, 
                          social sharing, related articles, and SEO optimization for 
                          better visibility and engagement.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
