'use client'

import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchBar() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar produtos..."
        className="pl-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  )
} 