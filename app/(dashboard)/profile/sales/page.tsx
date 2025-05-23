import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default async function SalesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Buscar o saldo real do usuário
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { balance: true }
  })

  const sales = await prisma.purchase.findMany({
    where: {
      sellerId: session.user.id,
    },
    include: {
      product: true,
      buyer: {
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
        {/* Carteira/SALDO */}
        <div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6 shadow flex items-center justify-between mb-6">
            <div>
              <div className="text-lg font-semibold">Saldo disponível para saque</div>
              <div className="text-3xl font-bold mt-2">{formatPrice(user?.balance ?? 0)}</div>
            </div>
            <button className="bg-white text-blue-700 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition">
              Solicitar saque
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Minhas Vendas</h1>
          <p className="text-muted-foreground">
            Acompanhe o status das suas vendas
          </p>
        </div>
        <div className="space-y-4">
          {sales.map((sale) => (
            <Card key={sale.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{sale.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprado por {sale.buyer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vendido em {formatDate(sale.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatPrice(sale.product.price)}
                  </p>
                  <Badge
                    variant={
                      sale.status === 'DELIVERED'
                        ? 'default'
                        : sale.status === 'SHIPPED'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {sale.status === 'PENDING'
                      ? 'Pendente'
                      : sale.status === 'SOLD'
                      ? 'Pago'
                      : sale.status === 'SHIPPED'
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