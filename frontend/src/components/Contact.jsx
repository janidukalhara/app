import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, MessageSquare } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { contactService } from '../services/api';
import { personalInfo } from '../data/mock';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactService.submitContactForm(formData);

      const messageText = response?.message
        ? typeof response.message === "string"
          ? response.message
          : JSON.stringify(response.message)
        : "Thank you for reaching out. I'll get back to you soon!";

      toast({ title: "Message Sent Successfully! 🎉", description: messageText });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again.";
      if (error?.response?.data?.message) errorMessage = error.response.data.message;
      else if (error?.message) errorMessage = error.message;
      else if (typeof error === "object") errorMessage = JSON.stringify(error);

      toast({ title: "Error Sending Message", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { icon: <Mail className="w-6 h-6 text-blue-400" />, title: "Email", value: personalInfo.email, link: `mailto:${personalInfo.email}`, description: "Send me an email anytime" },
    { icon: <Phone className="w-6 h-6 text-green-400" />, title: "Phone", value: personalInfo.phone, link: `tel:${personalInfo.phone}`, description: "Call or text message" },
    { icon: <MapPin className="w-6 h-6 text-red-400" />, title: "Location", value: personalInfo.location, link: "#", description: "Based in Sri Lanka" }
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, name: "GitHub", url: personalInfo.github, color: "hover:text-gray-300" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: `https://${personalInfo.linkedin}`, color: "hover:text-blue-400" },
    { icon: <ExternalLink className="w-5 h-5" />, name: "Portfolio", url: personalInfo.currentPortfolio, color: "hover:text-green-400" }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900/80 backdrop-blur-sm">
      <Helmet>
        <title>Contact Janidu Kalhara Perera – Hire a Full-Stack Developer</title>
        <meta
          name="description"
          content="Get in touch with Janidu Kalhara Perera for Full-Stack development, data analytics, and 3D web solutions. Send a message and start your next project today."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Person",
              "name": personalInfo.name,
              "email": personalInfo.email,
              "telephone": personalInfo.phone,
              "url": personalInfo.currentPortfolio,
              "sameAs": [personalInfo.github, `https://${personalInfo.linkedin}`],
              "jobTitle": "Full-Stack Developer & Business Analyst",
              "address": { "@type": "PostalAddress", "addressLocality": personalInfo.location, "addressCountry": "Sri Lanka" }
            },
            "description": "Contact page to reach Janidu Kalhara Perera for projects, collaboration, or inquiries."
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/80 border-gray-700 mb-8 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-400" /> Let's Connect
                </h3>
                <div className="space-y-6">
                  {contactMethods.map((method, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-2 bg-gray-700/50 rounded-lg backdrop-blur-sm">{method.icon}</div>
                      <div>
                        <h4 className="font-medium text-white">{method.title}</h4>
                        <a href={method.link} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 break-all">{method.value}</a>
                        <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-700/50 rounded-lg text-gray-300 transition-all duration-300 hover:bg-gray-600/50 transform hover:scale-105 backdrop-blur-sm ${social.color}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 backdrop-blur-sm" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 backdrop-blur-sm" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 backdrop-blur-sm" placeholder="Project Discussion / Job Opportunity / Consultation" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={isSubmitting} rows={6} className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 resize-none backdrop-blur-sm" placeholder="Tell me about your project or inquiry..." />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105">
                    {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 inline-block"></div> : <Send className="w-5 h-5 mr-2 inline-block" />} 
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Response Promise */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-green-900/30 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Response Guaranteed</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                I typically respond to all inquiries within <span className="text-blue-400 font-semibold">24 hours</span>. Whether it's a project discussion, collaboration opportunity, or just a friendly chat about technology, I'm excited to connect with you!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
