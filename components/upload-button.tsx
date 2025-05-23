import { useState } from 'react'
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

export function UploadButton() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      toast({
        title: 'Sucesso',
        description: 'Imagem atualizada com sucesso!',
      })
      router.refresh()
    },
    onUploadError: () => {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer upload da imagem',
        variant: 'destructive',
      })
    },
  })

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="relative"
      disabled={isUploading}
      onClick={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            setIsUploading(true)
            await startUpload([file])
            setIsUploading(false)
          }
        }
        input.click()
      }}
    >
      <Camera className="h-4 w-4 mr-2" />
      {isUploading ? 'Enviando...' : 'Alterar foto'}
    </Button>
  )
} 