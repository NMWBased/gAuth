"use client"

import { useEffect, useRef, useState } from 'react'

export default function ProfileForm({ user }: { user: any }) {
  const supabaseRef = useRef<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ full_name: user?.user_metadata?.full_name || '', address: user?.user_metadata?.address || '', phone: user?.user_metadata?.phone || '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    let mounted = true
    async function init() {
      const { supabase } = await import('../lib/supabaseClient')
      if (!mounted) return
      supabaseRef.current = supabase
    }
    init()
    return () => { mounted = false }
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!supabaseRef.current) return setMessage('Cliente não inicializado')
    setLoading(true)
    setMessage('')
    try {
      const { error } = await supabaseRef.current.auth.updateUser({ data: form })
      if (error) throw error
      setMessage('Perfil atualizado com sucesso')
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div>
        <label className="form-label">
          <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Nome completo
        </label>
        <input 
          className="form-input" 
          value={form.full_name} 
          onChange={(e) => setForm(s => ({ ...s, full_name: e.target.value }))} 
          placeholder="Digite o seu nome completo"
        />
      </div>
      <div>
        <label className="form-label">
          <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Morada
        </label>
        <input 
          className="form-input" 
          value={form.address} 
          onChange={(e) => setForm(s => ({ ...s, address: e.target.value }))} 
          placeholder="Digite a sua morada"
        />
      </div>
      <div>
        <label className="form-label">
          <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Telefone
        </label>
        <input 
          className="form-input" 
          value={form.phone} 
          onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))} 
          placeholder="Digite o seu telefone"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              A gravar...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar
            </>
          )}
        </button>
        {message && <p className="text-sm muted">{message}</p>}
      </div>
    </form>
  )
}
