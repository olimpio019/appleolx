import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  try {
    console.log('GET /api/products - Iniciando requisição')
    const session = await getServerSession(authOptions)

    const products = await prisma.product.findMany({
      where: {
        status: 'AVAILABLE'
      },
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('GET /api/products - Produtos encontrados:', products.length)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return new NextResponse('Erro interno do servidor', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, images, condition } = body

    if (!name || !description || !price || !images || images.length === 0 || !condition) {
      return new NextResponse('Dados inválidos', { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse('Usuário não encontrado', { status: 404 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        condition,
        sellerId: user.id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCTS_POST]', error)
    return new NextResponse('Erro interno', { status: 500 })
  }
} 