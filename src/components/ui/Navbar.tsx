import { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { resumeData } from '../../data/resume';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surfaceLight/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tighter text-white hover-target inline-flex items-center gap-2">
          <span className="text-primary">&lt;</span>
          {resumeData.name.split(' ')[0]}
          <span className="text-primary">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-textMuted hover:text-white transition-colors hover-target"
            >
              {link.name}
            </a>
          ))}
          <a
            href={resumeData.contact.github}
            target="_blank"
            rel="noreferrer"
            className="text-textMuted hover:text-white transition-colors hover-target"
          >
            <Github size={20} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-textMuted hover:text-white hover-target"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-white/10 py-4 px-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-textMuted hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={resumeData.contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-base font-medium text-textMuted hover:text-white transition-colors"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
      )}
    </nav>
  );
};
