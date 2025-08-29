import React, { Suspense } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import ThreeDBackground from "./components/ThreeDBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Loading component for 3D background
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0" />
);

function App() {
  return (
    <div className="App min-h-screen text-white relative">
      {/* 3D Background */}
      <Suspense fallback={<LoadingFallback />}>
        <ThreeDBackground />
      </Suspense>

      {/* Main content with relative positioning to appear above 3D background */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}

export default App;