'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UploadButton } from '@/lib/uploadthing'

const profileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface UpdateProfileFormProps {
  user: {
    id: string
    name: string
    image: string | null
  }
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true)

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil')
      }

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar seu perfil. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label>Foto de perfil</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                toast({
                  title: 'Imagem atualizada',
                  description: 'Sua foto de perfil foi atualizada com sucesso.',
                })
              }}
              onUploadError={(error: Error) => {
                toast({
                  title: 'Erro',
                  description: 'Não foi possível fazer upload da imagem.',
                  variant: 'destructive',
                })
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            {...register('name')}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </form>
  )
} 