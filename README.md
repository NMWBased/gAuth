## Deploy (Vercel)

1. Crie um project no Vercel (https://vercel.com/new)
2. No painel do projeto, em Settings → Environment Variables, adicione:

   - NEXT_PUBLIC_SUPABASE_URL = <your supabase url>
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon key>

3. Defina a branch para deploy (por exemplo, `main`) e clique em Deploy.

O Next irá construir o site no ambiente do Vercel e as variáveis públicas do Supabase estarão disponíveis em runtime.

Teste de push