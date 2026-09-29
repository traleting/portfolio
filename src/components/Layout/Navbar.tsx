import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.slice(1));
      const offset = 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-ink-950/90 backdrop-blur-md border-b border-ink-200 dark:border-ink-800 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-content flex items-center justify-between h-16">
        {/* Logo / Name */}
        <a href="#home" className="flex items-center gap-2 font-semibold text-ink-900 dark:text-ink-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold">
            TR
          </span>
          <span className="hidden sm:inline text-sm">Thabo Raleting</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 animate-fade-in-down">
          <div className="container-content py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
