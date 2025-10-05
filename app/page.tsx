'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabaseRef = useRef<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function init() {
      const { supabase } = await import('../lib/supabaseClient')
      if (!mounted) return
      supabaseRef.current = supabase
      
      // Check if user is logged in
      const { data } = await supabaseRef.current.auth.getUser()
      if (!mounted) return
      
      if (data?.user) {
        // User is logged in, redirect to welcome
        router.push('/welcome')
        return
      }
      
      // User is not logged in, redirect to login
      router.push('/login')
    }
    init()
    return () => { mounted = false }
  }, [router])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="muted">Carregando...</p>
      </div>
    </div>
  )
}
