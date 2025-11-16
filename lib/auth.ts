import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')
const SECRET = process.env.AUTH_SECRET || 'dev_secret_change_me'

function ensure() {
  const dir = path.dirname(USERS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]))
}

export async function createUser(email:string, password:string, role='student') {
  ensure()
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
  if (users.find((u:any)=>u.email===email)) throw new Error('Email already used')
  const hash = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), email, password: hash, role, createdAt: new Date().toISOString() }
  users.push(user)
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  return { id: user.id, email: user.email, role: user.role }
}

export async function verifyUser(email:string, password:string) {
  ensure()
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
  const user = users.find((u:any)=>u.email===email)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return null
  return { id: user.id, email: user.email, role: user.role }
}

export function signToken(payload:any) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}
export function verifyToken(token:string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}
