import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyUser, signToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const { email, password } = req.body
    const user = await verifyUser(email, password)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.setHeader('Set-Cookie', `rik_token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}`)
    res.status(200).json({ user })
  } catch (err:any) {
    res.status(500).json({ error: String(err) })
  }
}
