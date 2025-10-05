"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WelcomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabaseRef = useRef<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function init() {
      const { supabase } = await import('../../lib/supabaseClient')
      if (!mounted) return
      supabaseRef.current = supabase
      
      // Get current user
      const { data } = await supabaseRef.current.auth.getUser()
      if (!mounted) return
      
      if (!data?.user) {
        // User not logged in, redirect to login
        router.push('/login')
        return
      }
      
      setUser(data.user)
      setLoading(false)
    }
    init()
    return () => { mounted = false }
  }, [router])

  if (loading) {
    return (
      <div className="auth-container">
        <div className="welcome-card">
          <p className="muted">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="auth-container">
      <div className="welcome-card">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo!</h1>
        <p className="mb-2 text-lg">Olá, <strong>{user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilizador'}</strong></p>
        <p className="mb-6 muted">Sessão iniciada com sucesso. O que gostaria de fazer?</p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/profile" className="btn btn-primary">
            Ver Perfil
          </Link>
          <button className="btn btn-secondary" onClick={(e) => {
            e.preventDefault()
            if (supabaseRef.current) {
              supabaseRef.current.auth.signOut()
              router.push('/login')
            }
          }}>
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
