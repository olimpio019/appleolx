'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-sm leading-relaxed">
              Somos uma plataforma especializada em produtos Apple, oferecendo a melhor
              experiência de compra e venda para nossos usuários.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              {[
                { href: '/sobre', text: 'Sobre' },
                { href: '/contato', text: 'Contato' },
                { href: '/privacidade', text: 'Política de Privacidade' },
                { href: '/termos', text: 'Termos de Uso' },
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href={link.href} className="hover:text-white transition-colors text-sm">
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              {[
                { href: '/categoria/iphone', text: 'iPhone' },
                { href: '/categoria/ipad', text: 'iPad' },
                { href: '/categoria/mac', text: 'Mac' },
                { href: '/categoria/watch', text: 'Apple Watch' },
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href={link.href} className="hover:text-white transition-colors text-sm">
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, href: 'https://facebook.com' },
                { icon: FaInstagram, href: 'https://instagram.com' },
                { icon: FaTwitter, href: 'https://twitter.com' },
                { icon: FaYoutube, href: 'https://youtube.com' },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Apple Store. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 