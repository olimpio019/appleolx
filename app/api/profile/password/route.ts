import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
})

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = passwordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        password: true,
      },
    })

    if (!user?.password) {
      return new NextResponse('Usuário não encontrado', { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    )

    if (!isPasswordValid) {
      return new NextResponse('Senha atual incorreta', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    return new NextResponse('Senha atualizada com sucesso', { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Dados inválidos', { status: 400 })
    }

    return new NextResponse('Erro interno do servidor', { status: 500 })
  }
} 