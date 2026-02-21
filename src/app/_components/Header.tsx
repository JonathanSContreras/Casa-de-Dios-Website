'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock} from 'lucide-react';
import { usePathname } from 'next/navigation';


export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const isActive = (path: string) => pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navItems = [
    { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
    { path: '/about', labelEn: 'About', labelEs: 'Nosotros' },
    { path: '/ministries', labelEn: 'Ministries', labelEs: 'Ministerios' },
    { path: '/events', labelEn: 'Events', labelEs: 'Eventos' },
    { path: '/prayer-request', labelEn: 'Prayer', labelEs: 'Oración' },
    { path: '/contact', labelEn: 'Contact', labelEs: 'Contacto' },
    { path: '/give', labelEn: 'Give', labelEs: 'Ofrendar' },
  ];

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
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#1A5D5D]">
            {language === 'en' ? 'HOUSE OF GOD' : 'CASA DE DIOS'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#1A5D5D]'
                    : 'text-[#4A4A4A] hover:text-[#1A5D5D]'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelEs}
              </Link>
            ))}
          </div>

          {/* CTA and Language Toggle */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-[#4A4A4A] hover:text-[#1A5D5D] transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <Link
              href="/contact"
              className="bg-[#1A5D5D] text-white px-8 py-3 font-medium hover:bg-[#154A4A] transition-colors"
            >
              {language === 'en' ? 'Service Times' : 'Horarios'}
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
          <div className="px-6 py-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive(item.path) ? 'text-[#1A5D5D]' : 'text-[#4A4A4A]'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelEs}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
              <button
                onClick={toggleLanguage}
                className="block w-full text-left text-sm font-medium text-[#4A4A4A]"
              >
                {language === 'en' ? 'Español' : 'English'}
              </button>
              <Link
                href="/contact"
                className="block w-full bg-[#1A5D5D] text-white px-8 py-3 font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === 'en' ? 'Service Times' : 'Horarios'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}