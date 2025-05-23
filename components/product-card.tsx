import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type ProductCardProps = {
  product: {
    id: string
    name: string
    description: string
    price: number
    images: string[]
    condition: string
    seller: {
      name: string
      image: string | null
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}
      className="block group">
      <Card className="overflow-hidden shadow transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        <CardHeader className="p-0">
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="absolute top-2 right-2 bg-white/80 rounded px-2 py-1 text-xs font-semibold text-gray-700 shadow">
              {formatPrice(product.price)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={product.condition === 'NEW' ? 'default' : 'secondary'}>
              {product.condition === 'NEW' ? 'Novo' : 'Usado'}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-apple-blue transition-colors duration-300">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center gap-2 border-t border-gray-100">
          <Avatar className="h-7 w-7">
            <AvatarImage src={product.seller.image || '/user.png'} />
            <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {product.seller.name}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
} 