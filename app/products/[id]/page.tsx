import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true }
  })

  if (!product) return notFound()

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-6 min-h-[350px]">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain rounded shadow-md"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${product.condition === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {product.condition === 'NEW' ? 'Novo' : 'Usado'}
            </span>
            <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
            <div className="text-3xl font-bold text-apple-blue mb-6">{formatPrice(product.price)}</div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Image
              src={product.seller.image || '/user.png'}
              alt={product.seller.name}
              width={40}
              height={40}
              className="rounded-full border"
            />
            <span className="text-gray-700 font-medium">{product.seller.name}</span>
          </div>
          <button className="mt-8 bg-apple-blue text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition">
            Comprar agora
          </button>
        </div>
      </div>
    </div>
  )
} 