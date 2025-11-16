import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, signToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const { email, password, role } = req.body
    const user = await createUser(email, password, role || 'student')
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.setHeader('Set-Cookie', `rik_token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}`)
    res.status(201).json({ user })
  } catch (err:any) {
    res.status(400).json({ error: err.message })
  }
}
