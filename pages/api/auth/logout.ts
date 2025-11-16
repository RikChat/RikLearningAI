import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req, res) {
  res.setHeader('Set-Cookie', `rik_token=deleted; HttpOnly; Path=/; Max-Age=0`)
  res.status(200).json({ ok: true })
}
