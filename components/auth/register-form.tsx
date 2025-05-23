'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Algo deu errado')
      }

      toast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso!',
      })

      router.push('/login')
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Algo deu errado',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Seu nome"
          required
        />
      </div>
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
        {isLoading ? 'Criando conta...' : 'Criar conta'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="text-apple-blue hover:underline"
        >
          Entre
        </Link>
      </p>
    </form>
  )
} 