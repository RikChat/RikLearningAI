import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

const DB_FILE = path.join(process.cwd(), 'data', 'materi.json')
function ensure() {
  const dir = path.dirname(DB_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]))
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  ensure()
  const raw = fs.readFileSync(DB_FILE, 'utf-8')
  const all = JSON.parse(raw)
  if (req.method === 'GET') {
    return res.status(200).json(all)
  } else if (req.method === 'POST') {
    const { title, content } = req.body
    const item = { id: uuidv4(), title, content, createdAt: new Date().toISOString() }
    all.push(item)
    fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2))
    return res.status(201).json(item)
  } else {
    res.status(405).end()
  }
}
