"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import NextDynamic from 'next/dynamic'

const ProfileForm = NextDynamic(() => import('../../components/ProfileForm'), { ssr: false })

export default function ProfilePage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Dashboard do Perfil</h2>
        <p className="profile-subtitle">Gerencie os seus dados pessoais</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3 aria-label="Os seus dados pessoais">
            Os seus dados
          </h3>
          <div>
            <div className="profile-item">
              <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="profile-label">Nome:</span>
              <span className="profile-value">{user.user_metadata?.full_name || '—'}</span>
            </div>
            <div className="profile-item">
              <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email || '—'}</span>
            </div>
            <div className="profile-item">
              <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="profile-label">Morada:</span>
              <span className="profile-value">{user.user_metadata?.address || '—'}</span>
            </div>
            <div className="profile-item">
              <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="profile-label">Telefone:</span>
              <span className="profile-value">{user.user_metadata?.phone || '—'}</span>
            </div>
          </div>
        </div>
        
        <div className="profile-card">
          <h3 aria-label="Editar dados pessoais">
            Editar dados
          </h3>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  )
}
