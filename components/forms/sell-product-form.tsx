'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { UploadButton } from '@/lib/uploadthing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaCloudUploadAlt } from 'react-icons/fa'

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.string().min(1, 'Preço é obrigatório'),
  condition: z.enum(['NEW', 'USED'], {
    required_error: 'Condição do produto é obrigatória',
  }),
})

type ProductFormValues = z.infer<typeof productSchema>

export function SellProductForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  })

  async function onSubmit(data: ProductFormValues) {
    if (images.length === 0) {
      toast({
        title: 'Erro',
        description: 'Pelo menos uma imagem é obrigatória.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          images,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto')
      }

      toast({
        title: 'Produto cadastrado',
        description: 'Seu produto foi cadastrado com sucesso.',
      })

      reset()
      setImages([])
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível cadastrar o produto. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2 sm:px-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do produto</Label>
          <Input
            id="name"
            {...register('name')}
            disabled={isLoading}
            className="text-base sm:text-lg px-3 py-2 sm:py-3"
          />
          {errors.name && (
            <p className="text-xs sm:text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register('description')}
            disabled={isLoading}
            className="text-base sm:text-lg px-3 py-2 sm:py-3 min-h-[80px]"
          />
          {errors.description && (
            <p className="text-xs sm:text-sm text-destructive mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price')}
            disabled={isLoading}
            className="text-base sm:text-lg px-3 py-2 sm:py-3"
          />
          {errors.price && (
            <p className="text-xs sm:text-sm text-destructive mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condição do produto</Label>
          <Select
            onValueChange={(value) => setValue('condition', value as 'NEW' | 'USED')}
            disabled={isLoading}
          >
            <SelectTrigger id="condition" className="text-base sm:text-lg px-3 py-2 sm:py-3">
              <SelectValue placeholder="Selecione a condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">Novo</SelectItem>
              <SelectItem value="USED">Usado</SelectItem>
            </SelectContent>
          </Select>
          {errors.condition && (
            <p className="text-xs sm:text-sm text-destructive mt-1">{errors.condition.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Imagens</Label>
          <div className="flex flex-col items-center gap-4">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  const urls = res.map((file) => file.url)
                  setImages((prev) => [...prev, ...urls])
                  toast({
                    title: 'Imagens enviadas',
                    description: 'As imagens foram enviadas com sucesso.',
                  })
                }
              }}
              onUploadError={(error: Error) => {
                toast({
                  title: 'Erro',
                  description: 'Não foi possível fazer upload das imagens.',
                  variant: 'destructive',
                })
              }}
              className="max-w-xs w-full sm:w-auto px-4 py-2 text-base sm:text-lg rounded-lg shadow border border-blue-200 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {images.length > 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {images.length} imagem(ns) selecionada(s)
              </p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-3 text-base sm:text-lg">
        {isLoading ? 'Cadastrando...' : 'Cadastrar produto'}
      </Button>
    </form>
  )
} 