'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage(){
  const [email,setEmail]=useState('admin@example.com')
  const [password,setPassword]=useState('password')
  const [role,setRole]=useState('student')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')
  const router = useRouter()
  async function reg(){
    setLoading(true); setErr('')
    try {
      await axios.post('/api/auth/register', { email, password, role })
      router.push('/')
    } catch (e:any) {
      setErr(e.response?.data?.error || 'Gagal')
    } finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold">Daftar — RikLearning AI</h1>
        <input className="w-full mt-4 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mt-3 p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="w-full mt-3 p-2 border rounded" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        {err && <div className="text-red-600 mt-2">{err}</div>}
        <div className="flex gap-2 mt-4">
          <button onClick={reg} disabled={loading} className="flex-1 bg-indigo-600 text-white p-2 rounded">Daftar</button>
          <a href="/login" className="p-2 border rounded">Masuk</a>
        </div>
      </div>
    </div>
  )
}
