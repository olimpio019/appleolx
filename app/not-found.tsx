import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-gray-600 mb-8">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <Link
        href="/"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </main>
  )
} 