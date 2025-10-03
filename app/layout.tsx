import './globals.css'
import { ReactNode } from 'react'
import Header from '../components/Header'

export const metadata = {
  title: 'Next + Supabase + Tailwind',
  description: 'Starter project'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="text-slate-800">
  <main className="min-h-screen container mx-auto p-3 flex flex-col min-h-0">
          <Header />
          <div className="flex-1 flex items-center justify-center min-h-0 pt-2">{children}</div>
          <footer className="mt-8 border-t pt-4 text-center text-sm text-mono-600">
            Built with Next.js • Supabase • Tailwind
          </footer>
        </main>
      </body>
    </html>
  )
}
