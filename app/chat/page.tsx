'use client'
import { useState } from 'react'
import axios from 'axios'

export default function ChatPage() {
  const [messages, setMessages] = useState<{role:'user'|'assistant', text:string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, {role:'user', text: userMsg}])
    setInput('')
    setLoading(true)
    try {
      const res = await axios.post('/api/chat', { message: userMsg, history: messages })
      const reply = res.data.reply
      setMessages(prev => [...prev, {role:'assistant', text: reply}])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, {role:'assistant', text: 'Terjadi error saat memproses. Cek log server.'}])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">RikLearning AI — Chat</h2>
          <div className="mt-4 space-y-3 max-h-80 overflow-auto p-2">
            {messages.length===0 && <div className="text-gray-500">Tanyakan sesuatu, misal: "Jelaskan aljabar kelas 8"</div>}
            {messages.map((m, i) => (
              <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
                <div className={m.role==='user' ? 'inline-block bg-indigo-600 text-white px-3 py-2 rounded-lg' : 'inline-block bg-gray-100 px-3 py-2 rounded-lg'}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Ketik pertanyaan..." />
            <button onClick={send} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? '...' : 'Kirim'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
