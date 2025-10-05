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
      <body>
        <div className="app-layout">
          <header className="app-header">
            <div className="container">
              <Header />
            </div>
          </header>
          
          <main className="app-content">
            <div className="content-wrapper">
              {children}
            </div>
          </main>
          
          <footer className="app-footer">
            Built with Next.js • Supabase • Tailwind
          </footer>
        </div>
      </body>
    </html>
  )
}
