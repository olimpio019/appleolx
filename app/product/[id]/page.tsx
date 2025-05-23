import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Status } from '@prisma/client'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative h-96 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-24 w-full">
                <Image
                  src={image}
                  alt={`${product.name} - Imagem ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.condition === 'NEW'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {product.condition === 'NEW' ? 'Novo' : 'Usado'}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === Status.AVAILABLE
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.status === Status.AVAILABLE ? 'Disponível' : 'Vendido'}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-700">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              {product.seller.image ? (
                <Image
                  src={product.seller.image}
                  alt={product.seller.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 font-medium">
                  {product.seller.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">Vendedor</p>
              <p className="text-gray-600">{product.seller.name}</p>
            </div>
          </div>

          {product.status === Status.AVAILABLE && (
            <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Comprar agora
            </button>
          )}
        </div>
      </div>
    </main>
  )
} 