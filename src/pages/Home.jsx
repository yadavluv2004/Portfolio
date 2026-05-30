import React, { useState, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import { Footer } from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import { CodHud } from "../components/CodHud";
import { CodMinimap } from "../components/CodMinimap";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onDone={onDone} />}

      <div style={{
        minHeight: "100vh",
        background: "#080808",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.7s ease",
        position: "relative",
      }}>
        {/* COD atmospheric background */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        }}>
          {/* Subtle radial vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
          }} />
          {/* Tactical grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(200,160,64,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(200,160,64,0.018) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.035) 3px, rgba(0,0,0,0.035) 4px)",
          }} />
          {/* Ambient top-right warm glow */}
          <div style={{
            position: "absolute", top: "-10%", right: "-10%",
            width: "55%", height: "55%",
            background: "radial-gradient(ellipse, rgba(200,160,64,0.04) 0%, transparent 65%)",
          }} />
          {/* Ambient bottom-left red glow */}
          <div style={{
            position: "absolute", bottom: "-10%", left: "-5%",
            width: "45%", height: "50%",
            background: "radial-gradient(ellipse, rgba(139,26,26,0.05) 0%, transparent 65%)",
          }} />
        </div>

        {/* COD HUD elements */}
        {loaded && (
          <>
            <CodHud />
            <CodMinimap />
          </>
        )}

        <ScrollProgress />
        <Navbar />

        <main style={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <AboutMe />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
