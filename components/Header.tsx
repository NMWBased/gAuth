"use client"

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const supabaseRef = useRef<any | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    let unsubscribe: (() => void) | null = null
    async function init() {
      const { createClientSupabase } = await import('../lib/supabaseClient')
      supabaseRef.current = createClientSupabase()
      const { data } = await supabaseRef.current.auth.getUser()
      if (!mounted) return
  setUserEmail(data?.user?.email ?? null)
  setUserAvatar(data?.user?.user_metadata?.avatar_url ?? null)
      const { data: sub } = supabaseRef.current.auth.onAuthStateChange((_event: any, session: any) => {
        setUserEmail(session?.user?.email ?? null)
        setUserAvatar(session?.user?.user_metadata?.avatar_url ?? null)
      })
      // keep unsubscribe function if provided by supabase client
      // the client returns an object with subscription that has unsubscribe method
      // but to be defensive, expose a function that calls unsubscribe.unsubscribe?.()
      if (sub && typeof (sub as any).unsubscribe === 'function') {
        unsubscribe = () => (sub as any).unsubscribe()
      }
    }
    init()
    return () => { mounted = false; if (unsubscribe) unsubscribe() }
  }, [])

  async function handleLogout() {
    if (!supabaseRef.current) return
    await supabaseRef.current.auth.signOut()
    setUserEmail(null)
    try { router.replace('/login') } catch (_) { window.location.href = '/login' }
  }

  function initials(email?: string) {
    if (!email) return 'U'
    const name = email.split('@')[0]
    return name.split(/[._\-]/).map(s => s[0]?.toUpperCase()).slice(0,2).join('')
  }

  return (
    <header className="mb-4 flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold text-mono-950 text-lg">NMWB</Link>
      </div>
      <nav className="flex items-center gap-4 text-sm">
        {userEmail ? (
          <>
            {pathname !== '/profile' && <Link href="/profile" className="nav-link">Profile</Link>}
            <button onClick={handleLogout} className="nav-link">Logout</button>
            {userAvatar ? (
              <img src={userAvatar} alt="avatar" className="avatar rounded-full w-8 h-8 object-cover" />
            ) : (
              <div className="avatar">{initials(userEmail)}</div>
            )}
          </>
        ) : null}
      </nav>
    </header>
  )
}
