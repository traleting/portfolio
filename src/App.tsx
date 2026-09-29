import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ForensicsSection } from '@/components/sections/ForensicsSection';
import { CVSection } from '@/components/sections/CVSection';
import { ContactSection } from '@/components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <SkillsSection />
        <ForensicsSection />
        <CVSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
