# RikLearning AI (Next.js)

Siap deploy ke Vercel. Fitur minimal yang disertakan:
- Halaman Splash + bottom navigation
- Chat UI (menggunakan /api/chat yang mem-proxy ke OpenAI)
- Bank Materi sederhana (file-based DB: data/materi.json)
- Kuis demo, Analytics sederhana (localStorage)

## Setup
1. Salin ke mesin lokal atau deploy ke Vercel.
2. Tambahkan environment variables:
   - OPENAI_API_KEY = (kunci OpenAI Anda)
   - OPENAI_MODEL = optional (contoh: gpt-4o-mini)
   - NEXT_PUBLIC_BASE_URL = optional (untuk server-side fetch)
3. `npm install`
4. `npm run dev` (atau deploy ke Vercel)

## Catatan
- Materi disimpan di data/materi.json (untuk prototipe). Untuk produksi, gunakan PostgreSQL + Prisma (skema contoh disertakan di /prisma).
- RAG dan embeddings: disiapkan sebagai TODO. Anda bisa tambah integrasi Embeddings dan vector DB (Pinecone/Supabase Vector) di `pages/api/materi`.


## Added features (v2)
- Simple auth (register/login) stored in data/users.json (JWT cookie)
- Role support: admin/student (select on register)
- Admin page to generate materi automatically using OpenAI (`/api/generate-materi`)
- Improved UI: header, nav, login/register pages

### Important
- This auth is intentionally simple for prototype/demo. For production use NextAuth + proper secure storage and HTTPS.
- Set `AUTH_SECRET` environment variable for token signing in production.
