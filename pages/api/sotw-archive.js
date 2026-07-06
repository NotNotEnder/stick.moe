// pages/api/sotw-archive.js — lists archived weeks from
// public/sotw/Archive/[week]/{song.mp3,cover.jpg}, newest first.
import fs from 'fs'
import path from 'path'

function parseWeek(name) {
  const [m, d, y] = name.split('.').map(Number)
  if (!m || !d || y === undefined) return 0
  return new Date(2000 + y, m - 1, d).getTime()
}

export default function handler(req, res) {
  const dir = path.join(process.cwd(), 'public', 'sotw', 'Archive')
  let weeks = []
  try {
    weeks = fs.readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort((a, b) => parseWeek(b) - parseWeek(a))
  } catch {
    weeks = []
  }
  res.status(200).json({ weeks })
}
