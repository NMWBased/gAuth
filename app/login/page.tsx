"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [googleLoading, setGoogleLoading] = useState(false)
  async function signInWithGoogle() {
    if (!supabaseRef.current) {
      setMessage('Inicializando cliente... tente novamente em 1s')
      return
    }
    setGoogleLoading(true)
    setMessage('')
    try {
      const redirectTo = window.location.origin + '/welcome'
      const { data, error } = await supabaseRef.current.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: redirectTo
        }
      })
      if (error) setMessage(error.message)
      // fallback: se data.url existir, navega para lá
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setMessage(err?.message || 'Erro no login Google')
    } finally {
      setGoogleLoading(false)
    }
  }
  const supabaseRef = useRef<any | null>(null)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function init() {
      const mod = await import('@supabase/auth-helpers-nextjs')
      if (!mounted) return
      supabaseRef.current = mod.createClientComponentClient()
      // listen for changes and redirect on login
      const { data: sub } = supabaseRef.current.auth.onAuthStateChange((_event: any, session: any) => {
        console.debug('[auth] onAuthStateChange event', _event, { hasSession: !!session, userId: session?.user?.id })
        if (session?.user) {
          // redirect to profile
          try { router.push('/profile') } catch (err) { console.debug('[auth] router.push failed, doing location.href fallback', err); window.location.href = '/profile' }
        }
      })

      // keep unsubscribe function if provided
      if (sub && typeof (sub as any).unsubscribe === 'function') {
        // attach to ref so cleanup can call it
        ;(supabaseRef as any).currentSub = sub
      }
    }
    init()
    return () => {
      mounted = false
      // cleanup subscription if present
      try {
        const sub = (supabaseRef as any).currentSub
        if (sub && typeof sub.unsubscribe === 'function') sub.unsubscribe()
      } catch (_) {}
      // no google-specific timeouts to clear
    }
  }, [])


  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!supabaseRef.current) {
      setMessage('Inicializando cliente... tente novamente em 1s')
      return
    }
    setMessage('Enviando link...')
    try {
  const redirectTo = window.location.origin + '/welcome'
  // use emailRedirectTo option so supabase will append the correct redirect
  const { error } = await supabaseRef.current.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } })
      if (error) setMessage(error.message)
      else setMessage('Verifique o seu e-mail para o link mágico.')
    } catch (err: any) {
      setMessage(err?.message || 'Erro ao enviar link')
    }
  }
  return (
    <div className="auth-wrap">
      <div className="w-full max-w-md auth-card transform transition duration-300 ease-out text-center">
        <h2 className="text-2xl font-semibold mb-4">Entrar</h2>
        <form onSubmit={signInWithEmail} className="space-y-3 mb-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <button className="w-full px-4 py-2 bg-mono-900 text-white rounded" type="submit">Enviar link por e-mail</button>
        </form>

        <div className="mb-2 text-sm text-mono-600">ou</div>
        <button type="button" onClick={(e) => { e.preventDefault(); signInWithGoogle(); }} disabled={googleLoading} className={`w-full px-4 py-3 rounded flex items-center justify-center gap-3 bg-white text-mono-900 ${googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.6H272v101.4h146.9c-6.3 34.1-25.1 63-53.6 82.3v68.3h86.6c50.8-46.8 81.6-115.9 81.6-198.4z"/><path fill="#34A853" d="M272 544.3c72.6 0 133.6-24.1 178.1-65.5l-86.6-68.3c-24.1 16.2-55 25.9-91.5 25.9-70.2 0-129.7-47.4-151-111.2H34.9v69.9C79.3 486 170.9 544.3 272 544.3z"/><path fill="#FBBC05" d="M121 326.2c-10.9-32.9-10.9-68.4 0-101.3V154.9H34.9C12.6 200.2 0 246.0 0 278.4s12.6 78.2 34.9 123.5L121 326.2z"/><path fill="#EA4335" d="M272 108.1c38.9 0 74 13.4 101.5 39.6l76.1-76.1C402.8 24.5 345.2 0 272 0 170.9 0 79.3 58.3 34.9 154.9l86.1 69.9C142.3 155.5 201.8 108.1 272 108.1z"/></svg>
          <span className="font-semibold">Entrar com Google</span>
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  )
}
