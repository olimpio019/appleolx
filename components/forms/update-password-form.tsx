'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type PasswordFormValues = z.infer<typeof passwordSchema>

export function UpdatePasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  })

  async function onSubmit(data: PasswordFormValues) {
    try {
      setIsLoading(true)

      const response = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar senha')
      }

      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi atualizada com sucesso.',
      })

      reset()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar sua senha. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Senha atual</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register('currentPassword')}
            disabled={isLoading}
          />
          {errors.currentPassword && (
            <p className="text-sm text-destructive">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nova senha</Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword')}
            disabled={isLoading}
          />
          {errors.newPassword && (
            <p className="text-sm text-destructive">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Atualizar senha'}
      </Button>
    </form>
  )
} 