import { ProductGrid } from './product-grid'
import { Product } from '@prisma/client'

interface NovidadesProps {
  products: (Product & {
    seller: {
      name: string
      image: string | null
    }
  })[]
}

export default function Novidades({ products }: NovidadesProps) {
  return (
    <section className="w-full py-12 bg-gray-50">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        As novidades. <span className="font-normal text-gray-700">Veja o que acabou de chegar.</span>
      </h3>
      <div className="container mx-auto">
        <ProductGrid products={products} />
      </div>
    </section>
  )
} 