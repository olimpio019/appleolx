"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaSignOutAlt, FaShoppingBag, FaChartLine, FaCog, FaTools } from "react-icons/fa";

export default function ProfileMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Log para debug
  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
  }, [session, status]);

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

  // Se estiver carregando, mostra um placeholder
  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  // Se não estiver autenticado
  if (!session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/login"
          className="text-blue-700 hover:text-blue-900 font-medium text-sm sm:text-base"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-blue-800 transition-colors text-sm sm:text-base"
        >
          Cadastrar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-2xl sm:text-3xl text-blue-700 hover:text-blue-900 cursor-pointer"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        aria-label="Abrir menu do perfil"
      >
        <FaUserCircle />
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile: menu centralizado, fixed */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="sm:hidden fixed left-1/2 top-20 z-[9999] w-[95vw] max-w-xs bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200"
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="p-5 pb-3 border-b border-gray-100">
                <span className="font-bold text-base text-gray-800 block mb-0.5">{session.user.name}</span>
                <span className="text-xs text-gray-500 font-medium">{session.user.email}</span>
              </div>
              <div className="py-2 flex flex-col gap-1">
                <Link 
                  href="/profile/purchases" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaShoppingBag className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Minhas Compras
                </Link>
                <Link 
                  href="/profile/sales" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaChartLine className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Minhas Vendas
                </Link>
                <Link 
                  href="/profile/settings" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaCog className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Configurações
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-700 font-semibold text-sm group"
                    onClick={() => setOpen(false)}
                  >
                    <FaTools className="text-blue-500 group-hover:text-blue-700 transition-colors" /> Painel Admin
                  </Link>
                )}
                <button
                  className="flex items-center gap-2 px-5 py-2 rounded-lg w-full text-left hover:bg-red-50 transition-colors text-red-600 text-sm group mt-1"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <FaSignOutAlt className="text-red-400 group-hover:text-red-600 transition-colors" /> Sair
                </button>
              </div>
            </motion.div>
            {/* Desktop: menu alinhado ao ícone, sem cortar */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="hidden sm:block absolute right-0 top-full mt-3 w-64 max-w-xs min-w-[220px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl z-[9999] border border-gray-200"
            >
              {/* Seta do menu */}
              <div className="absolute -top-2 right-6 w-4 h-4 bg-white/80 border-r border-t border-gray-200 rotate-45 shadow-md"></div>
              <div className="p-5 pb-3 border-b border-gray-100">
                <span className="font-bold text-lg text-gray-800 block mb-0.5">{session.user.name}</span>
                <span className="text-xs text-gray-500 font-medium">{session.user.email}</span>
              </div>
              <div className="py-2 flex flex-col gap-1">
                <Link 
                  href="/profile/purchases" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-base text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaShoppingBag className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Minhas Compras
                </Link>
                <Link 
                  href="/profile/sales" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-base text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaChartLine className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Minhas Vendas
                </Link>
                <Link 
                  href="/profile/settings" 
                  className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-base text-gray-700 group"
                  onClick={() => setOpen(false)}
                >
                  <FaCog className="text-blue-400 group-hover:text-blue-600 transition-colors" /> Configurações
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-700 font-semibold text-base group"
                    onClick={() => setOpen(false)}
                  >
                    <FaTools className="text-blue-500 group-hover:text-blue-700 transition-colors" /> Painel Admin
                  </Link>
                )}
                <button
                  className="flex items-center gap-2 px-5 py-2 rounded-lg w-full text-left hover:bg-red-50 transition-colors text-red-600 text-base group mt-1"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <FaSignOutAlt className="text-red-400 group-hover:text-red-600 transition-colors" /> Sair
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 