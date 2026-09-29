import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { AdminApp } from '@/components/admin/AdminApp';
import { ProjectDetailPage } from '@/components/projects/ProjectDetailPage';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { DevelopmentWorkflowSection } from '@/components/sections/DevelopmentWorkflowSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ForensicsSection } from '@/components/sections/ForensicsSection';
import { CVSection } from '@/components/sections/CVSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { getProjectById } from '@/data/projects';
import { routePath } from '@/lib/paths';

function App() {
  const pathname = routePath(window.location.pathname);

  if (/^\/admin(?:\/|$)/.test(pathname)) {
    return <AdminApp />;
  }

  const projectRoute = pathname.match(/^\/projects\/([^/]+)\/?$/);

  if (projectRoute) {
    const project = getProjectById(projectRoute[1]);
    if (project) return <ProjectDetailPage project={project} />;
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-50 px-6 dark:bg-ink-950">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Project not found
          </p>
          <h1 className="mt-3 text-3xl font-bold text-ink-900 dark:text-ink-50">
            This project is unavailable
          </h1>
          <p className="mt-3 text-ink-600 dark:text-ink-400">
            The project link may be incorrect or the project may have been removed.
          </p>
          <a
            href="/#projects"
            className="mt-6 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Back to all projects
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <DevelopmentWorkflowSection />
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
