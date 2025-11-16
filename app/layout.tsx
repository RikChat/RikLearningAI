import './globals.css'
import { ReactNode } from 'react'
import Nav from './_components/Nav'

export const metadata = {
  title: 'RikLearning AI',
  description: 'Chatbot + materi pembelajaran — tutor 24/7',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-40 shadow-sm">
          <div className="max-w-5xl mx-auto p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="w-10 h-10 rounded" />
              <div>
                <div className="font-bold">RikLearning AI</div>
                <div className="text-xs text-gray-500">Tutor privat 24 jam</div>
              </div>
            </div>
            <div>
              <a href="/login" className="px-3 py-1 border rounded mr-2">Masuk</a>
              <a href="/register" className="px-3 py-1 bg-indigo-600 text-white rounded">Daftar</a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <Nav />
      </body>
    </html>
  )
}
