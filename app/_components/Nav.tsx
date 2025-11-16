'use client'
import Link from 'next/link'
export default function Nav(){
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md px-6 py-2 flex gap-6 z-50">
      <Link href="/chat">Chat</Link>
      <Link href="/materi">Materi</Link>
      <Link href="/kuis">Kuis</Link>
      <Link href="/analytics">Analytics</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  )
}
