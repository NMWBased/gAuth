export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { supabase } from '../../lib/supabaseClient'
import { redirect } from 'next/navigation'
import NextDynamic from 'next/dynamic'

const ProfileForm = NextDynamic(() => import('../../components/ProfileForm'), { ssr: false })
const LoginBanner = NextDynamic(() => import('../../components/LoginBanner'), { ssr: false })

export default async function ProfilePage() {
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user) redirect('/login')

  return (
    <div className="space-y-6">
      <LoginBanner />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard do Perfil</h2>
          <p className="text-sm text-mono-600">Gerencie os seus dados pessoais</p>
        </div>
        {/* Avatar removido conforme solicitado */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded shadow-subtle">
          <h3 className="text-lg font-medium mb-3">Os seus dados</h3>
          <p className="mb-2"><span className="font-semibold">Nome:</span> {user.user_metadata?.full_name || '—'}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {user.email || '—'}</p>
          <p className="mb-2"><span className="font-semibold">Morada:</span> {user.user_metadata?.address || '—'}</p>
          <p className="mb-2"><span className="font-semibold">Telefone:</span> {user.user_metadata?.phone || '—'}</p>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded shadow-subtle">
          <h3 className="text-lg font-medium mb-3">Editar dados</h3>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  )
}
