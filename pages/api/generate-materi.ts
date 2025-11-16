import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

const DB_FILE = path.join(process.cwd(), 'data', 'materi.json')
function ensure() {
  const dir = path.dirname(DB_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { title, level, topic } = req.body
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not set' })
  try {
    const prompt = `Buat materi pembelajaran terstruktur untuk judul: "${title || topic}". Level: ${level || 'menengah'}. Sertakan: ringkasan singkat, 3 subbab dengan penjelasan, 3 contoh soal dan pembahasan singkat, dan saran video pembelajaran (URL dummy). Berikan output dalam format JSON dengan fields: title, content_html, difficulty.`
    const body = {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Kamu adalah pembuat materi pembelajaran dalam format JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1000,
    }
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify(body)
    })
    const data = await resp.json()
    const text = data.choices?.[0]?.message?.content || ''
    // try to extract JSON from response
    let parsed = null
    try {
      const firstBrace = text.indexOf('{')
      const jsonText = firstBrace>=0 ? text.slice(firstBrace) : text
      parsed = JSON.parse(jsonText)
    } catch (e) {
      // fallback: wrap in basic structure
      parsed = { title: title||topic, content_html: `<p>${text.replace(/\n/g,'<br/>')}</p>`, difficulty: 2 }
    }
    ensure()
    const all = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const item = { id: uuidv4(), title: parsed.title||title||topic, content: parsed.content_html||parsed.content||parsed.body||'', difficulty: parsed.difficulty||2, createdAt: new Date().toISOString() }
    all.push(item)
    fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2))
    res.status(201).json(item)
  } catch (err:any) {
    res.status(500).json({ error: String(err) })
  }
}
