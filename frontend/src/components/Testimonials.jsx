import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center relative">
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 opacity-20">
                <Quote className="w-16 h-16 text-blue-400" />
              </div>
              
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(5)}
              </div>
              
              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-4 border-blue-500/30"
                />
                <div className="text-center md:text-left">
                  <div className="text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-400 font-medium">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial 
                          ? 'bg-blue-500' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-105">
              <CardContent className="p-6">
                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500/30 mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-blue-400">
                      {testimonial.position}
                    </div>
                    <div className="text-xs text-gray-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex mb-3">
                  {renderStars(5)}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-gray-300 text-sm leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-green-900/30 border-blue-500/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Work With Me</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                Ready to bring your project to life? Let's collaborate and create 
                something amazing together.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;