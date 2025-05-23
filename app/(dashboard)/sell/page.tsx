import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { SellProductForm } from '@/components/forms/sell-product-form'

export default async function SellPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/sell')
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Vender Produto</h1>
          <p className="text-muted-foreground">
            Cadastre um novo produto para venda
          </p>
        </div>

        <Card className="p-6">
          <SellProductForm />
        </Card>
      </div>
    </div>
  )
} 