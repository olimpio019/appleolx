'use client'

import { ProductCard } from './product-card'
import { Product } from '@prisma/client'

type ProductWithSeller = Product & {
  seller: {
    name: string
    image: string | null
  }
}

interface ProductGridProps {
  products: ProductWithSeller[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">
          Nenhum produto encontrado
        </h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 