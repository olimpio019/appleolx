"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import ProfileMenu from "@/components/ProfileMenu"
import SearchBar from "@/components/SearchBar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
            <span className="font-extrabold"></span> Apple Marketplace
          </Link>
        </motion.div>

        {/* Barra de pesquisa centralizada - esconde em mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-lg"
          >
            <SearchBar />
          </motion.div>
        </div>

        {/* Menu de perfil à direita */}
        <div className="hidden md:block ml-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProfileMenu />
          </motion.div>
        </div>

        {/* Botão do menu mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Menu mobile */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="w-full">
            <SearchBar />
          </div>
          <div className="w-full">
            <ProfileMenu />
          </div>
        </div>
      </motion.div>
    </header>
  )
} 