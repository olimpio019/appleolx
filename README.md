# Apple Marketplace

Um marketplace moderno para compra e venda de produtos Apple, inspirado no design minimalista da Apple.

## 🚀 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- PostgreSQL (Neon.tech)
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- Cloudinary/UploadThing
- Nodemailer

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL (local ou Neon.tech)
- Conta no Cloudinary ou UploadThing
- Serviço de email (para Nodemailer)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/apple-marketplace.git
cd apple-marketplace
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais.

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🚀 Deploy na Vercel

1. Crie uma conta na [Vercel](https://vercel.com)
2. Crie um projeto no [Neon.tech](https://neon.tech) para o banco de dados
3. Configure as variáveis de ambiente na Vercel:
   - Copie todas as variáveis do seu `.env.local`
   - Adicione a URL do banco de dados do Neon.tech
4. Faça o deploy:
```bash
vercel
```

## 📦 Estrutura do Projeto

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   └── profile/
│   ├── api/
│   └── page.tsx
├── components/
├── lib/
├── prisma/
└── public/
```

## 🔐 Funcionalidades

- Autenticação com NextAuth.js
- Upload de imagens
- Sistema de compra e venda
- Painel administrativo
- Notificações por email
- Design responsivo

## 📝 Licença

Este projeto está sob a licença MIT. 