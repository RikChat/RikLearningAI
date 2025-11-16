import { cookies } from 'next/headers'
import axios from 'axios'

export default async function MateriDetail({ params }: { params: { id: string }}) {
  const id = params.id
  // Server component fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/materi/${id}`)
  const data = await res.json()
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  )
}
