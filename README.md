# 🔐 gAuth - Sistema de Autenticação Moderno

Sistema de autenticação completo construído com **Next.js**, **Supabase** e **Tailwind CSS**. Oferece login via Google OAuth e magic links por email, com interface moderna e responsiva.

## ✨ Funcionalidades

- 🚀 **Autenticação Google OAuth** - Login rápido e seguro
- 📧 **Magic Links** - Login sem senha via email
- 👤 **Gestão de Perfil** - Edição de dados pessoais
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS
- 🔒 **Segurança** - Autenticação robusta com Supabase
- 📱 **Responsivo** - Funciona perfeitamente em todos os dispositivos

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Autenticação:** Supabase Auth
- **Styling:** Tailwind CSS
- **Linguagem:** TypeScript
- **Deploy:** Vercel

## 🚀 Começar

### Pré-requisitos

- Node.js 18+ 
- Conta no [Supabase](https://supabase.com)
- Conta no [Google Cloud Console](https://console.cloud.google.com)

### 1. Clonar o Repositório

```bash
git clone https://github.com/NMWBased/gAuth.git
cd gAuth
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Configurar Supabase

#### No painel do Supabase:

1. **Authentication → URL Configuration:**
   - Site URL: `http://localhost:3000` (desenvolvimento)
   - Additional Redirect URLs: `http://localhost:3000/welcome`

2. **Authentication → Providers → Google:**
   - Ativar Google provider
   - Adicionar Client ID e Client Secret do Google

### 5. Configurar Google OAuth

#### No Google Cloud Console:

1. **APIs & Services → OAuth 2.0 Client IDs**
2. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://your-domain.vercel.app
   ```
3. **Authorized redirect URIs:**
   ```
   https://your-supabase-url/auth/v1/callback
   ```

### 6. Executar em Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000] no seu navegador.

## 📂 Estrutura do Projeto

```
gAuth/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── login/             # Página de login
│   ├── welcome/           # Página de boas-vindas
│   └── profile/           # Página de perfil
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho da aplicação
│   └── ProfileForm.tsx    # Formulário de perfil
├── lib/                   # Utilitários e configurações
│   └── supabaseClient.ts  # Cliente Supabase
└── public/               # Arquivos estáticos
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Servidor de produção
- `npm run lint` - Verificar código

## 🚀 Deploy (Vercel)

### 1. Conectar ao Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente

### 2. Variáveis de Ambiente

No painel do Vercel, em **Settings → Environment Variables:**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Configurar URLs de Produção

#### No Supabase:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/welcome`

#### No Google OAuth:
- JavaScript origins: `https://your-app.vercel.app`

### 4. Deploy Automático

O Vercel fará deploy automático a cada push para a branch principal.

## 🔒 Segurança

- ✅ **Autenticação segura** via Supabase
- ✅ **OAuth flows** padronizados
- ✅ **Session management** automático
- ✅ **HTTPS** obrigatório em produção
- ✅ **Environment variables** protegidas

## 🎨 Personalização

### Cores e Tema

Edite `app/globals.css` para personalizar:

```css
:root {
  --primary: #3b82f6;
  --secondary: #64748b;
  --accent: #10b981;
}
```

### Componentes

Os componentes estão em `components/` e podem ser facilmente customizados.

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🤝 Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Verifique as [Issues existentes](https://github.com/NMWBased/gAuth/issues)
2. Abra uma nova issue se necessário
3. Consulte a [documentação do Supabase](https://supabase.com/docs)

---

Desenvolvido com ❤️ por [NMWBased](https://github.com/NMWBased)