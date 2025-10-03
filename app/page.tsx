'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Small delay to ensure client hydration
    const timer = setTimeout(() => {
      router.replace('/login')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [router])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Carregando...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Fallback UI with manual link
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao gAuth</h1>
        <p className="text-gray-600 mb-6">Sistema de autenticação com Supabase</p>
        <Link 
          href="/login" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  )
}
