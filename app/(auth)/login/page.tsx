import { LoginForm } from '@/components/auth/login-form'
import { Card } from '@/components/ui/card'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>
        <Card className="p-6">
          <Suspense fallback={<div>Carregando...</div>}>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </div>
  )
} 