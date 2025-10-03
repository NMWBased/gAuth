"use client"

import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div className="auth-wrap">
      <div className="w-full max-w-2xl auth-card text-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo</h1>
        <p className="mb-6 text-mono-600">Sessão iniciada com sucesso.</p>
        <div className="flex justify-center">
          <Link href="/profile" className="px-4 py-2 rounded text-sm bg-mono-900 text-white">Ver Perfil</Link>
        </div>
      </div>
    </div>
  )
}
