import Link from "next/link";

export default function BannerPrincipal() {
  return (
    <section className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200">
      {/* Imagem de fundo */}
      <img
        src="/banner-apple.jpg"
        alt="Produtos Apple"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ zIndex: 1 }}
      />
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-400/40" style={{ zIndex: 2 }} />
      {/* Conteúdo central */}
      <div className="relative z-10 text-center text-white flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-4">Apple Marketplace</h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow">Encontre e venda os melhores produtos Apple</p>
        <div className="flex gap-4">
          <Link href="/search">
            <button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition">
              Ver ofertas
            </button>
          </Link>
          <Link href="/sell">
            <button className="bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
              Comece a vender
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
} 