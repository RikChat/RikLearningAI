'use client'
import { useState } from 'react'

const demo = [
  { q: 'Berapakah 2+2?', options: ['2','3','4','5'], a: 2 },
  { q: 'Apa tipe data untuk teks di JS?', options: ['number','string','boolean','object'], a: 1 },
]

export default function KuisPage(){
  const [index,setIndex]=useState(0)
  const [score,setScore]=useState(0)
  const [done,setDone]=useState(false)

  function answer(i:number){
    if (i===demo[index].a) setScore(s=>s+1)
    if (index+1===demo.length) setDone(true)
    else setIndex(index+1)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">Kuis Cepat</h1>
        {!done ? (
          <>
            <div className="mt-4">{demo[index].q}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {demo[index].options.map((opt, i)=>(
                <button key={i} onClick={()=>answer(i)} className="border p-2 rounded">{opt}</button>
              ))}
            </div>
          </>
        ) : (
          <div>Nilai: {score} / {demo.length}</div>
        )}
      </div>
    </div>
  )
}
