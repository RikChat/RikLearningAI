'use client'
import { useState } from 'react'
import axios from 'axios'

export default function AdminPage(){
  const [title,setTitle]=useState('')
  const [topic,setTopic]=useState('')
  const [level,setLevel]=useState('pemula')
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState<any>(null)

  async function generate(){
    setLoading(true); setResult(null)
    try {
      const res = await axios.post('/api/generate-materi', { title, topic, level })
      setResult(res.data)
    } catch (e:any) {
      setResult({ error: e.response?.data?.error || String(e) })
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">Admin — Generate Materi Otomatis</h1>
        <input className="w-full mt-3 p-2 border rounded" placeholder="Judul materi (opsional)" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="w-full mt-3 p-2 border rounded" placeholder="Topik (mis: aljabar kelas 8)" value={topic} onChange={e=>setTopic(e.target.value)} />
        <select className="w-full mt-3 p-2 border rounded" value={level} onChange={e=>setLevel(e.target.value)}>
          <option value="pemula">Pemula</option>
          <option value="menengah">Menengah</option>
          <option value="lanjutan">Lanjutan</option>
        </select>
        <div className="mt-4 flex gap-2">
          <button onClick={generate} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">{loading ? 'Membuat...' : 'Generate Materi'}</button>
          <a href="/materi" className="px-4 py-2 border rounded">Lihat Materi</a>
        </div>
        {result && <div className="mt-4 bg-gray-50 p-3 rounded">
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>}
      </div>
    </div>
  )
}
