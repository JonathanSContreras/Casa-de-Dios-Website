'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [primaryLang, setPrimaryLang] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('primaryLang') as 'en' | 'es' | null;
    if (saved) setPrimaryLang(saved);
  }, []);

  const toggleLanguage = () => {
    const next = primaryLang === 'en' ? 'es' : 'en';
    setPrimaryLang(next);
    localStorage.setItem('primaryLang', next);
  };

  const navItems = [
    { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
    { path: '/about', labelEn: 'About', labelEs: 'Nosotros' },
    { path: '/ministries', labelEn: 'Ministries', labelEs: 'Ministerios' },
    { path: '/calendar', labelEn: 'Calendar', labelEs: 'Calendario' },
    { path: '/events', labelEn: 'Events', labelEs: 'Eventos' },
    { path: '/prayer-request', labelEn: 'Prayer', labelEs: 'Oración' },
    { path: '/contact', labelEn: 'Contact', labelEs: 'Contacto' },
    { path: '/give', labelEn: 'Give', labelEs: 'Ofrendar' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-[#1A5D5D] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto text-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(281) 713-0681</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>13315 Veterans Memorial Dr #102, Houston, TX 77014</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>Sunday Services: 12:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-24">

            {/* Logo — both names, primary on top */}
            <Link href="/" className="flex flex-col leading-none">
              <span
                className={`font-bold transition-all duration-200 ${
                  primaryLang === 'en'
                    ? 'text-xl text-[#1A5D5D]'
                    : 'text-sm text-[#8A8A8A]'
                }`}
              >
                HOUSE OF GOD
              </span>
              <span
                className={`font-bold transition-all duration-200 ${
                  primaryLang === 'es'
                    ? 'text-xl text-[#1A5D5D]'
                    : 'text-sm text-[#8A8A8A]'
                }`}
              >
                CASA DE DIOS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const primaryLabel = primaryLang === 'en' ? item.labelEn : item.labelEs;
                const secondaryLabel = primaryLang === 'en' ? item.labelEs : item.labelEn;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="group flex flex-col items-center"
                  >
                    <span
                      className={`text-sm font-semibold leading-tight transition-colors ${
                        active
                          ? 'text-[#1A5D5D]'
                          : 'text-[#4A4A4A] group-hover:text-[#1A5D5D]'
                      }`}
                    >
                      {primaryLabel}
                    </span>
                    <span
                      className={`text-xs leading-tight transition-colors ${
                        active
                          ? 'text-[#1A5D5D]/50'
                          : 'text-[#9A9A9A] group-hover:text-[#1A5D5D]/50'
                      }`}
                    >
                      {secondaryLabel}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Language Toggle + CTA */}
            <div className="hidden lg:flex items-center gap-6">
              {/* EN / ES toggle — bold whichever is primary */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm transition-colors"
                aria-label="Toggle language order"
              >
                <span
                  className={`font-semibold transition-colors ${
                    primaryLang === 'en' ? 'text-[#1A5D5D]' : 'text-[#9A9A9A]'
                  }`}
                >
                  EN
                </span>
                <span className="text-[#C5C5C5]">/</span>
                <span
                  className={`font-semibold transition-colors ${
                    primaryLang === 'es' ? 'text-[#1A5D5D]' : 'text-[#9A9A9A]'
                  }`}
                >
                  ES
                </span>
              </button>

              {/* CTA — both languages stacked */}
              <Link
                href="/calendar"
                className="flex flex-col items-center bg-[#1A5D5D] text-white px-8 py-2 hover:bg-[#154A4A] transition-colors"
              >
                <span className="text-sm font-semibold">
                  {primaryLang === 'en' ? 'Service Times' : 'Horarios'}
                </span>
                <span className="text-xs opacity-70">
                  {primaryLang === 'en' ? 'Horarios' : 'Service Times'}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#4A4A4A]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E5E5]">
            <div className="px-6 py-6 space-y-5">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const primaryLabel = primaryLang === 'en' ? item.labelEn : item.labelEs;
                const secondaryLabel = primaryLang === 'en' ? item.labelEs : item.labelEn;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <span
                      className={`block text-base font-semibold leading-tight ${
                        active ? 'text-[#1A5D5D]' : 'text-[#4A4A4A]'
                      }`}
                    >
                      {primaryLabel}
                    </span>
                    <span
                      className={`block text-sm leading-tight ${
                        active ? 'text-[#1A5D5D]/50' : 'text-[#9A9A9A]'
                      }`}
                    >
                      {secondaryLabel}
                    </span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 text-sm"
                >
                  <span
                    className={`font-semibold ${
                      primaryLang === 'en' ? 'text-[#1A5D5D]' : 'text-[#9A9A9A]'
                    }`}
                  >
                    EN
                  </span>
                  <span className="text-[#C5C5C5]">/</span>
                  <span
                    className={`font-semibold ${
                      primaryLang === 'es' ? 'text-[#1A5D5D]' : 'text-[#9A9A9A]'
                    }`}
                  >
                    ES
                  </span>
                </button>

                <Link
                  href="/calendar"
                  className="block bg-[#1A5D5D] text-white px-8 py-3 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="block text-sm font-semibold">
                    {primaryLang === 'en' ? 'Service Times' : 'Horarios'}
                  </span>
                  <span className="block text-xs opacity-70">
                    {primaryLang === 'en' ? 'Horarios' : 'Service Times'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
