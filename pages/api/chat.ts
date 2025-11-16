import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Data = { reply: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data|{error:string}>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { message, history } = req.body
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not set in env' })
  try {
    // Simple proxy to OpenAI Chat API. Replace model if needed.
    const body = {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Kamu adalah tutor edukasi yang ramah dan jelas. Jawab singkat, terstruktur, dan beri contoh jika perlu.' },
        ...((history||[]).map((m:any)=> ({ role: m.role, content: m.text }))),
        { role: 'user', content: message }
      ],
      max_tokens: 800,
    }
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    })
    if (!resp.ok) {
      const errText = await resp.text()
      return res.status(500).json({ error: 'OpenAI error: '+errText })
    }
    const data = await resp.json()
    const reply = data.choices?.[0]?.message?.content || 'Maaf, tidak ada respon.'
    res.status(200).json({ reply })
  } catch (err:any) {
    console.error(err)
    res.status(500).json({ error: String(err) })
  }
}
