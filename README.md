# Next + Supabase + Tailwind starter

Minimal starter scaffold with Next.js (app router), TypeScript, TailwindCSS and Supabase example.

Setup

1. Copie o arquivo de exemplo:

   cp .env.local.example .env.local

2. Instale dependências:

   npm install

3. Rode em dev:

   npm run dev

Substitua as variáveis em `.env.local` com as credenciais do seu projeto Supabase.

Observações
- Este scaffold usa `@supabase/auth-helpers-nextjs` para conveniência em rotas de server/client.
- Se o `npm` der erro no PowerShell devido à política de execução, rode `"C:\\Program Files\\nodejs\\npm.cmd" -v` ou altere a política temporariamente.
- Se o `npm` der erro no PowerShell devido à política de execução, pode executar o binário diretamente ou usar o cmd:

```powershell
# Usar o cmd.exe para evitar wrappers do PowerShell
cmd /c "npm -v"
```

## Deploy (Vercel)

1. Crie um project no Vercel (https://vercel.com/new)
2. No painel do projeto, em Settings → Environment Variables, adicione:

   - NEXT_PUBLIC_SUPABASE_URL = <your supabase url>
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon key>

3. Defina a branch para deploy (por exemplo, `main`) e clique em Deploy.

O Next irá construir o site no ambiente do Vercel e as variáveis públicas do Supabase estarão disponíveis em runtime.

<!-- Google OAuth instructions removed: project currently uses email magic-link only. -->

