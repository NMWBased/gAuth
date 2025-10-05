"use client"

import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div className="auth-container">
      <div className="welcome-card">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo</h1>
        <p className="mb-6 muted">Sessão iniciada com sucesso.</p>
        <Link href="/profile" className="btn btn-primary">
          Ver Perfil
        </Link>
      </div>
    </div>
  )
}
