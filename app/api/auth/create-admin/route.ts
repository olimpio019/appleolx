import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST() {
  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Já existe um usuário administrador' },
        { status: 400 }
      )
    }

    // Criar usuário administrador
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@exemplo.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN'
      }
    })

    return NextResponse.json({
      message: 'Usuário administrador criado com sucesso',
      email: admin.email
    })
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error)
    return NextResponse.json(
      { message: 'Erro ao criar usuário administrador' },
      { status: 500 }
    )
  }
} 