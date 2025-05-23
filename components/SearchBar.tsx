"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl mx-auto my-4 sm:my-6"
    >
      <span className="absolute left-3 sm:left-4 text-gray-400 text-base sm:text-lg pointer-events-none">
        <FaSearch />
      </span>
      <input
        type="text"
        className="flex-1 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-full shadow transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg text-sm sm:text-lg bg-white"
        placeholder="Buscar produtos Apple..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold shadow hover:bg-blue-600 transition-colors text-sm sm:text-base"
      >
        Buscar
      </motion.button>
    </motion.form>
  );
} 