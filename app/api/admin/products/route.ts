import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const products = await prisma.product.findMany({
      include: {
        seller: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
} 