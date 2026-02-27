import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-[#F8F9FA] min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full text-center">

        {/* Large 404 */}
        <p className="text-[10rem] leading-none font-black text-[#1A5D5D]/10 select-none">
          404
        </p>

        {/* Divider with cross */}
        <div className="flex items-center justify-center gap-4 -mt-6 mb-8">
          <div className="h-px w-16 bg-[#1A5D5D]/30" />
          <span className="text-[#1A5D5D]/50 text-2xl font-light">✝</span>
          <div className="h-px w-16 bg-[#1A5D5D]/30" />
        </div>

        {/* Bilingual heading */}
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
          Page Not Found
        </h1>
        <h2 className="text-2xl lg:text-3xl font-semibold text-[#4A4A4A] mb-6">
          Página No Encontrada
        </h2>

        {/* Description */}
        <p className="text-[#6B6B6B] text-lg leading-relaxed mb-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <p className="text-[#6B6B6B] text-base leading-relaxed mb-10">
          La página que buscas no existe o ha sido movida.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block bg-[#1A5D5D] text-white font-semibold text-base px-8 py-4 rounded-sm hover:bg-[#154d4d] transition-colors duration-200"
        >
          Return Home / Ir al Inicio
        </Link>
      </div>
    </main>
  );
}
