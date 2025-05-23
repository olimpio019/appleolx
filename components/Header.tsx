"use client"

import Link from "next/link"
import ProfileMenu from "@/components/ProfileMenu"
import SearchBar from "@/components/SearchBar"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
          <span className="font-extrabold"></span> Apple Marketplace
        </Link>
        {/* Barra de pesquisa centralizada */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
        {/* Menu de perfil à direita */}
        <div className="ml-4">
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
} 