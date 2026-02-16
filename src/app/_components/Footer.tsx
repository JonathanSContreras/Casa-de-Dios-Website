import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white mt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-6">House of God</h3>
            <p className="text-[#E5E5E5] leading-relaxed mb-2">
              A contemporary Pentecostal congregation welcoming all.
            </p>
            <p className="text-[#E5E5E5] leading-relaxed">
              Una congregación pentecostal contemporánea que da la bienvenida a todos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-[#E5E5E5] hover:text-white transition-colors">
                Home / Inicio
              </Link>
              <Link href="/about" className="block text-[#E5E5E5] hover:text-white transition-colors">
                About / Nosotros
              </Link>
              <Link href="/events" className="block text-[#E5E5E5] hover:text-white transition-colors">
                Events / Eventos
              </Link>
              <Link href="/give" className="block text-[#E5E5E5] hover:text-white transition-colors">
                Give / Ofrendar
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact / Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-[#E5E5E5]">
                  13315 Veterans Memorial Dr<br />
                  Suite #102<br />
                  Houston, TX 77014
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-[#E5E5E5]">(281) 713-0681</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-[#E5E5E5]">hello@livinghope.org</span>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-xl font-bold mb-6">Service Times</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Sunday / Domingo</p>
                <p className="text-[#E5E5E5]">10:30 AM & 12:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Tuesday / Martes</p>
                <p className="text-[#E5E5E5]">8:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Friday / Viernes</p>
                <p className="text-[#E5E5E5]">8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-16 pt-8 border-t border-[#4A4A4A] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-[#E5E5E5] hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-[#E5E5E5] hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-[#E5E5E5] hover:text-white transition-colors">
              <Youtube size={24} />
            </a>
          </div>
          <p className="text-[#E5E5E5] text-sm">
            © {new Date().getFullYear()}  Iglesia Pentecostal Casa de Dios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
