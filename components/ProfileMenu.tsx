"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaShoppingBag, FaChartLine, FaCog, FaTools } from "react-icons/fa";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-blue-700 hover:text-blue-900 font-medium"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          Cadastrar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="text-3xl text-blue-700 hover:text-blue-900"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menu do perfil"
      >
        <FaUserCircle />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50 border animate-fade-in">
          <div className="p-4 border-b">
            <span className="font-semibold">{session.user.name}</span>
            <br />
            <span className="text-xs text-gray-500">{session.user.email}</span>
          </div>
          <Link href="/profile/purchases" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <FaShoppingBag /> Minhas Compras
          </Link>
          <Link href="/profile/sales" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <FaChartLine /> Minhas Vendas
          </Link>
          <Link href="/profile/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <FaCog /> Configurações
          </Link>
          {session.user.role === "ADMIN" && (
            <Link href="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-700 font-semibold">
              <FaTools /> Painel Admin
            </Link>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FaSignOutAlt /> Sair
          </button>
        </div>
      )}
    </div>
  );
} 