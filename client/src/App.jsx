import TouchEffects from './components/TouchEffects';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import CodingProfiles from './sections/CodingProfiles';
import Certifications from './sections/Certifications';
import OpenSource from './sections/OpenSource';
import GitHub from './sections/GitHub';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <TouchEffects />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Achievements />
        <CodingProfiles />
        <Certifications />
        <OpenSource />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
