import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            products: true,
            purchases: true,
          },
        },
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return new NextResponse('Erro interno do servidor', { status: 500 })
  }
} 