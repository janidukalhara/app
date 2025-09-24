// components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Janidu Kalhara Perera – Full-Stack Developer & Business Analyst",
  description = "Professional portfolio of Janidu Kalhara Perera showcasing Full-Stack development, data analytics, and 3D web experiences.",
  url = "https://janiduperera.netlify.app",
  image = "/images/profile.jpg",
  author = "Janidu Kalhara Perera",
  keywords = "Portfolio, Full-Stack Developer, Software Engineer, React, FastAPI, Data Analytics",
  structuredData = null
}) => {
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
