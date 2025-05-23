import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 4 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
        throw new Error('Não autorizado')
      }

      return { email: session.user.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        await prisma.user.update({
          where: { email: metadata.email },
          data: { image: file.url },
        })
      } catch (error) {
        console.error('Erro ao atualizar imagem do usuário:', error)
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 