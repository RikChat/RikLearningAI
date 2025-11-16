'use client'
import { useEffect, useState } from 'react'

export default function Analytics(){
  const [stats, setStats] = useState({ studied: 0, quizzes: 0 })
  useEffect(()=>{
    const s = localStorage.getItem('rik_stats')
    if (s) setStats(JSON.parse(s))
  },[])
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">Analytics Pembelajaran</h1>
        <div className="mt-4">Materi dipelajari: {stats.studied}</div>
        <div className="mt-2">Kuis dikerjakan: {stats.quizzes}</div>
      </div>
    </div>
  )
}
