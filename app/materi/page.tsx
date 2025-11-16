'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Materi = {
  id: string
  title: string
  content: string
  difficulty?: number
}

export default function MateriPage(){
  const [list, setList] = useState<Materi[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    axios.get('/api/materi').then(r=>{
      setList(r.data)
      setLoading(false)
    }).catch(e=>{
      console.error(e)
      setLoading(false)
    })
  },[])

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Bank Materi</h1>
        {loading ? <div>Loading...</div> : (
          <div className="mt-4 space-y-4">
            {list.map(m=>(
              <div key={m.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{m.title}</h2>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3" dangerouslySetInnerHTML={{__html: m.content}} />
                <div className="mt-3 flex gap-2">
                  <a className="text-indigo-600" href={`/materi/${m.id}`}>Buka</a>
                </div>
              </div>
            ))}
            {list.length===0 && <div className="text-gray-500">Belum ada materi. Gunakan panel admin atau fitur generate.</div>}
          </div>
        )}
      </div>
    </div>
  )
}
