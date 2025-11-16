'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const router = useRouter()
  async function doLogin(){
    setLoading(true); setError('')
    try {
      await axios.post('/api/auth/login', { email, password })
      router.push('/')
    } catch (e:any) {
      setError(e.response?.data?.error || 'Login gagal')
    } finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold">Masuk — RikLearning AI</h1>
        <input className="w-full mt-4 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mt-3 p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="flex gap-2 mt-4">
          <button onClick={doLogin} disabled={loading} className="flex-1 bg-indigo-600 text-white p-2 rounded">Masuk</button>
          <a href="/register" className="p-2 border rounded">Daftar</a>
        </div>
      </div>
    </div>
  )
}
