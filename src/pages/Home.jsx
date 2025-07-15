import React from 'react'
import ThemeToggle from '../components/ThemeToggle';
import { StarBackground } from "@/components/StarBackground";
import { Navbar } from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { Footer } from '../components/Footer';
const Home = () => {
  return (
    <div className='min-h-screen'>
      {/* {theme toogle} */}
      <ThemeToggle/>

      {/* {Background toggle} */}
      <StarBackground/>

      {/* {navabar} */}
      <Navbar/>

      {/* {Main Content} */}

      <main>

        <HeroSection/>
        <AboutMe/>
        <SkillsSection/>
        <ProjectsSection/>
        <ContactSection/>
      </main>

      <Footer/>


    </div>
  )
}

export default Home;
