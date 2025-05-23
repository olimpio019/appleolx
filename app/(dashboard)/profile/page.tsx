import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      _count: {
        select: {
          products: true,
          purchases: true,
          sales: true,
        },
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-muted-foreground">
            Visualize suas informações e estatísticas
          </p>
        </div>
        <Link href="/sell">
          <button className="bg-apple-blue text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            + Criar Produto
          </button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              Membro desde {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Produtos
            </p>
            <p className="text-2xl font-bold">{user._count.products}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Compras
            </p>
            <p className="text-2xl font-bold">{user._count.purchases}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Vendas
            </p>
            <p className="text-2xl font-bold">{user._count.sales}</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 