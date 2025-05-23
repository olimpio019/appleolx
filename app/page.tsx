import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BannerPrincipal from '@/components/BannerPrincipal'
import Categorias from '@/components/Categorias'
import Novidades from '@/components/Novidades'
import ProdutosDestaque from '@/components/ProdutosDestaque'
import { Status } from '@prisma/client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ProfileMenu from '@/components/ProfileMenu'
import SearchBar from '@/components/SearchBar'
import Header from '@/components/Header'

const LogoutButton = dynamic(() => import('@/components/LogoutButton'), { ssr: false })

export default async function Home() {
  const session = await getServerSession(authOptions)

  const products = await prisma.product.findMany({
    where: {
      status: Status.AVAILABLE,
    },
    include: {
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
  })

  const featuredProducts = await prisma.product.findMany({
    where: {
      status: Status.AVAILABLE,
    },
    include: {
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  })

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <BannerPrincipal />
        <div className="container py-8 space-y-8">
          <Categorias />
          <ProdutosDestaque produtos={featuredProducts} />
          <Novidades products={products} />
        </div>
      </main>
    </>
  )
} 