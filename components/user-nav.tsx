'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function UserNav() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">Entrar</Button>
        </Link>
        <Link href="/register">
          <Button>Cadastrar</Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/purchases">Minhas Compras</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/sales">Minhas Vendas</Link>
        </DropdownMenuItem>
        {session.user?.role === 'ADMIN' && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Painel Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => signOut()}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 