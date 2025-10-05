"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import NextDynamic from 'next/dynamic'

const ProfileForm = NextDynamic(() => import('../../components/ProfileForm'), { ssr: false })
const LoginBanner = NextDynamic(() => import('../../components/LoginBanner'), { ssr: false })

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
      <LoginBanner />
      
      <div className="profile-header">
        <h2 className="profile-title">Dashboard do Perfil</h2>
        <p className="profile-subtitle">Gerencie os seus dados pessoais</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Os seus dados</h3>
          <div className="space-y-4">
            <p><span className="font-semibold">Nome:</span> {user.user_metadata?.full_name || '—'}</p>
            <p><span className="font-semibold">Email:</span> {user.email || '—'}</p>
            <p><span className="font-semibold">Morada:</span> {user.user_metadata?.address || '—'}</p>
            <p><span className="font-semibold">Telefone:</span> {user.user_metadata?.phone || '—'}</p>
          </div>
        </div>
        
        <div className="profile-card">
          <h3>Editar dados</h3>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  )
}
