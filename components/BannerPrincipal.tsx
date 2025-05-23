'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function BannerPrincipal() {
  return (
    <section className="relative w-full h-[350px] md:h-[420px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200">
      {/* Imagem de fundo */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/banner-apple.jpg"
          alt="Produtos Apple"
          fill
          className="object-cover opacity-30"
          priority
        />
      </motion.div>

      {/* Overlay gradiente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-400/40"
      />

      {/* Conteúdo central */}
      <div className="relative z-10 text-center text-white flex flex-col items-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow mb-4"
        >
          Apple Marketplace
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-lg md:text-2xl mb-6 drop-shadow max-w-2xl"
        >
          Encontre e venda os melhores produtos Apple
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/search">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition-colors duration-300"
            >
              Ver ofertas
            </motion.button>
          </Link>
          <Link href="/sell">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition-colors duration-300"
            >
              Comece a vender
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 