"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function LoginBanner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get('login') === 'success') setVisible(true)
  }, [searchParams])

  if (!visible) return null

  function dismiss() {
    setVisible(false)
    // remove query param by pushing same pathname without params
    router.push('/profile')
  }

  return (
    <div className="mb-4 p-3 rounded bg-green-50 border border-green-200 text-green-800 flex items-start justify-between">
      <div>
        <strong>Login bem sucedido</strong>
        <div className="text-sm">Redirecionado para o seu perfil.</div>
      </div>
      <div>
        <button onClick={dismiss} className="ml-4 px-3 py-1 rounded bg-green-100 text-green-800">Fechar</button>
      </div>
    </div>
  )
}
