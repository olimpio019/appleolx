import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { UpdateProfileForm } from '@/components/forms/update-profile-form'
import { UpdatePasswordForm } from '@/components/forms/update-password-form'
import { DeleteAccountForm } from '@/components/forms/delete-account-form'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações de conta
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Perfil</h2>
              <p className="text-sm text-muted-foreground">
                Atualize suas informações pessoais
              </p>
            </div>
            <UpdateProfileForm user={user} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Senha</h2>
              <p className="text-sm text-muted-foreground">
                Altere sua senha
              </p>
            </div>
            <UpdatePasswordForm />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-destructive">
                Excluir Conta
              </h2>
              <p className="text-sm text-muted-foreground">
                Exclua permanentemente sua conta e todos os seus dados
              </p>
            </div>
            <DeleteAccountForm />
          </div>
        </Card>
      </div>
    </div>
  )
} 