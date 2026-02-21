import Link from 'next/link';
import { Home, Calendar, Heart, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white flex-1 flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <p className="text-lg font-bold text-[#E5E5E5] mb-4 tracking-widest uppercase">
              404 — Page Not Found / Página No Encontrada
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              You&apos;re a bit lost.
            </h1>
            <h2 className="text-5xl lg:text-7xl font-bold mb-12 text-[#E5E5E5]">
              Estás un poco perdido.
            </h2>
            <p className="text-xl lg:text-2xl mb-4 text-[#E5E5E5]">
              The page you&apos;re looking for doesn&apos;t exist — but you&apos;re always welcome here.
            </p>
            <p className="text-xl lg:text-2xl mb-12 text-[#E5E5E5]">
              La página que buscas no existe, pero siempre eres bienvenido aquí.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-[#1A5D5D] px-10 py-4 font-bold text-lg hover:bg-[#F8F9FA] transition-colors"
            >
              Go Home / Ir al Inicio
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h3 className="text-2xl font-bold mb-2">Where would you like to go?</h3>
          <p className="text-[#4A4A4A] mb-12 text-lg">¿A dónde te gustaría ir?</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/"
              className="group border-4 border-[#1A5D5D] p-8 flex flex-col items-start gap-4 hover:bg-[#1A5D5D] transition-colors"
            >
              <div className="bg-[#1A5D5D] group-hover:bg-white w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors">
                <Home className="w-6 h-6 text-white group-hover:text-[#1A5D5D] transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg text-[#1A5D5D] group-hover:text-white transition-colors">Home</p>
                <p className="text-[#4A4A4A] group-hover:text-[#E5E5E5] transition-colors">Inicio</p>
              </div>
            </Link>

            <Link
              href="/events"
              className="group border-4 border-[#1A5D5D] p-8 flex flex-col items-start gap-4 hover:bg-[#1A5D5D] transition-colors"
            >
              <div className="bg-[#1A5D5D] group-hover:bg-white w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors">
                <Calendar className="w-6 h-6 text-white group-hover:text-[#1A5D5D] transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg text-[#1A5D5D] group-hover:text-white transition-colors">Events</p>
                <p className="text-[#4A4A4A] group-hover:text-[#E5E5E5] transition-colors">Eventos</p>
              </div>
            </Link>

            <Link
              href="/prayer-request"
              className="group border-4 border-[#1A5D5D] p-8 flex flex-col items-start gap-4 hover:bg-[#1A5D5D] transition-colors"
            >
              <div className="bg-[#1A5D5D] group-hover:bg-white w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors">
                <Heart className="w-6 h-6 text-white group-hover:text-[#1A5D5D] transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg text-[#1A5D5D] group-hover:text-white transition-colors">Prayer</p>
                <p className="text-[#4A4A4A] group-hover:text-[#E5E5E5] transition-colors">Oración</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group border-4 border-[#1A5D5D] p-8 flex flex-col items-start gap-4 hover:bg-[#1A5D5D] transition-colors"
            >
              <div className="bg-[#1A5D5D] group-hover:bg-white w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors">
                <Phone className="w-6 h-6 text-white group-hover:text-[#1A5D5D] transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg text-[#1A5D5D] group-hover:text-white transition-colors">Contact</p>
                <p className="text-[#4A4A4A] group-hover:text-[#E5E5E5] transition-colors">Contacto</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
