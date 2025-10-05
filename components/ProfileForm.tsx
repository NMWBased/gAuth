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
        <label className="form-label">Nome completo</label>
        <input 
          className="form-input" 
          value={form.full_name} 
          onChange={(e) => setForm(s => ({ ...s, full_name: e.target.value }))} 
        />
      </div>
      <div>
        <label className="form-label">Morada</label>
        <input 
          className="form-input" 
          value={form.address} 
          onChange={(e) => setForm(s => ({ ...s, address: e.target.value }))} 
        />
      </div>
      <div>
        <label className="form-label">Telefone</label>
        <input 
          className="form-input" 
          value={form.phone} 
          onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))} 
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'A gravar...' : 'Guardar'}
        </button>
        {message && <p className="text-sm muted">{message}</p>}
      </div>
    </form>
  )
}
