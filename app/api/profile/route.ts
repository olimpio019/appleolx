import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name } = profileSchema.parse(body)

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Excluir todas as compras do usuário
    await prisma.purchase.deleteMany({
      where: {
        OR: [
          { buyerId: session.user.id },
          { sellerId: session.user.id },
        ],
      },
    })

    // Excluir todos os produtos do usuário
    await prisma.product.deleteMany({
      where: {
        sellerId: session.user.id,
      },
    })

    // Excluir o usuário
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })

    return NextResponse.json(
      { message: 'Conta excluída com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 