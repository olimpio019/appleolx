import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apple Marketplace',
  description: 'Compre e venda produtos Apple com segurança',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
} 