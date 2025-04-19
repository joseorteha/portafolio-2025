import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer className="bg-[#030014] py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
              {/* Línea divisoria */}
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />

              {/* Contenido del footer */}
              <div className="flex flex-col items-center space-y-4">
                {/* Nombre y año */}
                <div className="text-center">
                  <span className="text-sm text-gray-400">
                    © 2025 José Ortega. Todos los derechos reservados.
                  </span>
                </div>

                {/* Frase motivadora */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 italic">
                  "El mayor peligro en tiempos de turbulencia no es la turbulencia; es actuar con la lógica de ayer." – Grace Hopper
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer className="bg-[#030014] py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        {/* Línea divisoria */}
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />

        {/* Contenido del footer */}
        <div className="flex flex-col items-center space-y-4">
          {/* Nombre y año */}
          <div className="text-center">
            <span className="text-sm text-gray-400">
              © 2025 José Ortega. Todos los derechos reservados.
            </span>
          </div>

          {/* Frase motivadora */}
          <div className="text-center">
            <p className="text-sm text-gray-500 italic">
              "Hablar es barato. Muéstrame el código." – Linus Torvalds
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;