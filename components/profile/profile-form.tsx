import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UploadButton } from '@/components/upload-button'

type ProfileFormProps = {
  user: {
    name: string
    email: string
    image: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Algo deu errado')
      }

      toast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!',
      })

      router.refresh()
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <UploadButton />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user.email}
            disabled
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </form>
  )
} 