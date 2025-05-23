'use client'

import Link from "next/link";
import { FaApple, FaMobileAlt, FaTabletAlt, FaLaptop, FaClock } from "react-icons/fa";

const categorias = [
  {
    nome: "iPhone",
    href: "/search?category=iPhone",
    icon: <FaMobileAlt size={40} className="text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    nome: "iPad",
    href: "/search?category=iPad",
    icon: <FaTabletAlt size={40} className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    nome: "Mac",
    href: "/search?category=Mac",
    icon: <FaLaptop size={40} className="text-purple-500" />,
    bg: "bg-purple-50",
  },
  {
    nome: "Apple Watch",
    href: "/search?category=Apple%20Watch",
    icon: <FaClock size={40} className="text-yellow-500" />,
    bg: "bg-yellow-50",
  },
];

export default function Categorias() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-center">Categorias. <span className="font-normal text-gray-500">Encontre o que você procura.</span></h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categorias.map((cat) => (
          <Link key={cat.nome} href={cat.href} className={
            `group w-44 h-44 flex flex-col items-center justify-center gap-3 rounded-2xl shadow-md ${cat.bg} transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer`
          }>
            <div className="mb-2">{cat.icon}</div>
            <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition">{cat.nome}</span>
          </Link>
        ))}
      </div>
    </section>
  );
} 