import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product-card'
import { Prisma } from '@prisma/client'

interface SearchPageProps {
  searchParams: {
    q?: string
    minPrice?: string
    maxPrice?: string
    category?: string
    condition?: string
  }
}

const categorias = [
  'Mac',
  'iPhone',
  'iPad',
  'Apple Watch',
  'AirPods',
  'AirTag',
  'Apple TV 4K',
  'Acessórios',
]

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || ''
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  const category = searchParams.category || ''
  const condition = searchParams.condition || ''

  const where: any = {
    status: 'AVAILABLE',
    AND: [] as any[],
  }

  if (query) {
    where.AND.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    })
  }
  if (minPrice !== undefined) {
    where.AND.push({ price: { gte: minPrice } })
  }
  if (maxPrice !== undefined) {
    where.AND.push({ price: { lte: maxPrice } })
  }
  if (category) {
    where.AND.push({ name: { contains: category, mode: 'insensitive' } })
  }
  if (condition) {
    where.AND.push({ condition: condition.toUpperCase() })
  }

  const products = await prisma.product.findMany({
    where,
    include: { seller: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Resultados da busca
      </h1>
      <form className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded shadow" method="get">
        <input
          type="text"
          name="q"
          placeholder="Buscar por nome ou descrição..."
          defaultValue={query}
          className="col-span-1 md:col-span-2 border rounded px-3 py-2"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Preço mínimo"
          defaultValue={minPrice || ''}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Preço máximo"
          defaultValue={maxPrice || ''}
          className="border rounded px-3 py-2"
        />
        <select
          name="category"
          defaultValue={category}
          className="border rounded px-3 py-2"
        >
          <option value="">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          name="condition"
          defaultValue={condition}
          className="border rounded px-3 py-2"
        >
          <option value="">Todas as condições</option>
          <option value="NEW">Novo</option>
          <option value="USED">Usado</option>
        </select>
        <button type="submit" className="md:col-span-5 bg-apple-blue text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition mt-2 md:mt-0">
          Filtrar
        </button>
      </form>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          Nenhum produto encontrado para sua busca.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
} 