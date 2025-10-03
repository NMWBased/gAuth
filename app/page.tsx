import { redirect } from 'next/navigation'

export default function Home() {
  // Make login the default page
  redirect('/login')
}
