'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const deleteAccountSchema = z.object({
  confirmText: z.literal('EXCLUIR'),
})

type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>

export function DeleteAccountForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
  })

  async function onSubmit(data: DeleteAccountFormValues) {
    try {
      setIsLoading(true)

      const response = await fetch('/api/profile', {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir conta')
      }

      window.location.href = '/'
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir sua conta. Tente novamente.',
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
          <Label htmlFor="confirmText">
            Digite EXCLUIR para confirmar a exclusão da sua conta
          </Label>
          <Input
            id="confirmText"
            {...register('confirmText')}
            disabled={isLoading}
          />
          {errors.confirmText && (
            <p className="text-sm text-destructive">
              {errors.confirmText.message}
            </p>
          )}
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isLoading}>
            Excluir conta
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e removerá seus dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit(onSubmit)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
} 