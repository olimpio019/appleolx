import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    return NextResponse.json(session.user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
} 