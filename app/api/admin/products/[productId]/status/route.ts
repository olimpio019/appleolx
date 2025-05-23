import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const { status, buyerId } = await request.json();
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: true
      }
    });

    if (!product) {
      return new NextResponse('Produto não encontrado', { status: 404 });
    }

    let updatedProduct;

    if (status === 'SOLD' && buyerId) {
      // Criar uma compra para o produto
      await prisma.purchase.create({
        data: {
          productId,
          buyerId,
          sellerId: product.sellerId,
          status: 'SOLD'
        }
      });

      // Atualizar saldo do vendedor
      await prisma.user.update({
        where: { id: product.sellerId },
        data: {
          balance: {
            increment: product.price
          }
        }
      });

      updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { status }
      });

      // Enviar email para o vendedor
      if (product.seller.email) {
        await sendEmail({
          to: product.seller.email,
          subject: 'Seu produto foi vendido!',
          html: `
            <h1>Parabéns! Seu produto "${product.name}" foi vendido!</h1>
            <p>Por favor, prepare o produto para envio e aguarde as instruções de envio.</p>
            <p>Detalhes do produto:</p>
            <ul>
              <li>Nome: ${product.name}</li>
              <li>Preço: R$ ${product.price.toFixed(2)}</li>
            </ul>
          `
        });
      }
    } else {
      updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { status }
      });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
} 