import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";

function App() {
  return (
    <div className="App bg-black min-h-screen text-white">
      <Header />
      <Hero />
      <About />
      {/* Additional sections will be added in the next batch */}
    </div>
  );
}

export default App;