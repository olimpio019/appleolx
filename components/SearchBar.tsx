"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl mx-auto my-6"
    >
      <span className="absolute left-4 text-gray-400 text-lg pointer-events-none">
        <FaSearch />
      </span>
      <input
        type="text"
        className="flex-1 pl-12 pr-4 py-3 rounded-full shadow transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg text-lg bg-white"
        placeholder="Buscar produtos Apple..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </form>
  );
} 