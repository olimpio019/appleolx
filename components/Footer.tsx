'use client'

import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-sm">
              Somos uma plataforma especializada em produtos Apple, oferecendo a melhor
              experiência de compra e venda para nossos usuários.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/iphone" className="hover:text-white transition-colors">
                  iPhone
                </Link>
              </li>
              <li>
                <Link href="/categoria/ipad" className="hover:text-white transition-colors">
                  iPad
                </Link>
              </li>
              <li>
                <Link href="/categoria/mac" className="hover:text-white transition-colors">
                  Mac
                </Link>
              </li>
              <li>
                <Link href="/categoria/watch" className="hover:text-white transition-colors">
                  Apple Watch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Apple Store. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 