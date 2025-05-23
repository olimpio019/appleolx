'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        toast({
          title: 'Erro',
          description: 'Credenciais inválidas',
          variant: 'destructive',
        })
        return
      }

      // Verificar o papel do usuário e redirecionar adequadamente
      const response = await fetch('/api/auth/me')
      const user = await response.json()

      if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push(callbackUrl)
      }
      
      router.refresh()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nome@exemplo.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          className="text-apple-blue hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  )
} 