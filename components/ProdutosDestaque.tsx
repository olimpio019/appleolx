'use client'

import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProdutosDestaqueProps {
  produtos: (Product & {
    seller: {
      name: string
      image: string | null
    }
  })[]
}

export default function ProdutosDestaque({ produtos = [] }: ProdutosDestaqueProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  if (!produtos || produtos.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600">
              Nenhum produto em destaque no momento.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Descubra os produtos mais populares da nossa plataforma, selecionados
            especialmente para você.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {produtos.map((produto) => (
            <motion.div
              key={produto.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/product/${produto.id}`}>
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <Image
                    src={produto.images[0]}
                    alt={produto.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-blue-600">
                      {produto.condition === 'NEW' ? 'Novo' : 'Usado'}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      {produto.views} visualizações
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {produto.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
                    {produto.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      R$ {produto.price.toFixed(2)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      Ver mais
                    </motion.button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={produto.seller.image || '/placeholder.png'}
                        alt={produto.seller.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs md:text-sm text-gray-600">
                      {produto.seller.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 