import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/profile')
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {session.user.name}
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" asChild>
            <Link href="/profile">Perfil</Link>
          </TabsTrigger>
          <TabsTrigger value="purchases" asChild>
            <Link href="/profile/purchases">Compras</Link>
          </TabsTrigger>
          <TabsTrigger value="sales" asChild>
            <Link href="/profile/sales">Vendas</Link>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Link href="/profile/settings">Configurações</Link>
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  )
} 