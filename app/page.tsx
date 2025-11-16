import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <img src="/logo.png" alt="RikLearning AI" className="mx-auto w-32 h-32 object-contain"/>
        <h1 className="text-3xl font-bold mt-4">RikLearning AI</h1>
        <p className="mt-2 text-gray-600">Chatbot + Bank Materi — guru privat 24 jam.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/chat" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Mulai Chat</Link>
          <Link href="/materi" className="px-4 py-2 border rounded-lg">Lihat Materi</Link>
        </div>
      </div>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md px-6 py-2 flex gap-6">
        <Link href="/chat">Chat</Link>
        <Link href="/materi">Materi</Link>
        <Link href="/kuis">Kuis</Link>
        <Link href="/analytics">Analytics</Link>
      </nav>
    </main>
  )
}
