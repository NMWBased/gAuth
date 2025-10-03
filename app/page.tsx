import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Bem-vindo ao gAuth</h1>
        <p className="text-gray-600 mb-6">Sistema de autenticação com Supabase</p>
        <div className="space-y-4">
          <Link 
            href="/login" 
            className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Fazer Login
          </Link>
          <Link 
            href="/profile" 
            className="block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors"
          >
            Ver Perfil
          </Link>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Versão: 1.0.0</p>
          <p>Status: Funcionando ✅</p>
        </div>
      </div>
    </div>
  )
}
