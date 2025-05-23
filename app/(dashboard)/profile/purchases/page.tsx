import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default async function PurchasesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const purchases = await prisma.purchase.findMany({
    where: {
      buyerId: session.user.id,
    },
    include: {
      product: true,
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Minhas Compras</h1>
          <p className="text-muted-foreground">
            Acompanhe o status das suas compras
          </p>
        </div>
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{purchase.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Vendido por {purchase.seller.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Comprado em {formatDate(purchase.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatPrice(purchase.product.price)}
                  </p>
                  <Badge
                    variant={
                      purchase.status === 'DELIVERED'
                        ? 'default'
                        : purchase.status === 'SHIPPED'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {purchase.status === 'PENDING'
                      ? 'Pendente'
                      : purchase.status === 'SOLD'
                      ? 'Pago'
                      : purchase.status === 'SHIPPED'
                      ? 'Enviado'
                      : 'Entregue'}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 