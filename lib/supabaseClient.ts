import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Utility function to get current domain (respects preview deployments)
export const getCurrentDomain = () => {
  if (typeof window === 'undefined') return ''
  const domain = `${window.location.protocol}//${window.location.host}`
  console.log('getCurrentDomain:', domain)
  return domain
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
