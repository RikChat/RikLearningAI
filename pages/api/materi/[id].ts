import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DB_FILE = path.join(process.cwd(), 'data', 'materi.json')
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(DB_FILE)) return res.status(404).json({ error: 'Not found' })
  const all = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
  const id = req.query.id as string
  const item = all.find((a:any)=>a.id===id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.status(200).json(item)
}
