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
      const mod = await import('@supabase/auth-helpers-nextjs')
      if (!mounted) return
      supabaseRef.current = mod.createClientComponentClient()
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
    <form onSubmit={save} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm text-mono-600">Nome completo</label>
        <input className="w-full mt-1 px-3 py-2 border rounded bg-white text-mono-900" value={form.full_name} onChange={(e) => setForm(s => ({ ...s, full_name: e.target.value }))} />
      </div>
      <div>
        <label className="block text-sm text-mono-600">Morada</label>
        <input className="w-full mt-1 px-3 py-2 border rounded bg-white text-mono-900" value={form.address} onChange={(e) => setForm(s => ({ ...s, address: e.target.value }))} />
      </div>
      <div>
        <label className="block text-sm text-mono-600">Telefone</label>
        <input className="w-full mt-1 px-3 py-2 border rounded bg-white text-mono-900" value={form.phone} onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))} />
      </div>
      <div className="flex items-center gap-4">
        <button className="primary-btn" type="submit" disabled={loading}>{loading ? 'A gravar...' : 'Guardar'}</button>
        {message && <p className="text-sm text-mono-600">{message}</p>}
      </div>
    </form>
  )
}
