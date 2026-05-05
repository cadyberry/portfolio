export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "section"; title: string; items: Array<{ name: string; body: string }> }
  | { type: "signoff"; text: string }

export type Note = {
  slug: string
  date: string
  title: string
  excerpt: string
  blocks: NoteBlock[]
}

export const NOTES: Note[] = []

export function getNoteBySlug(slug: string): Note | undefined {
  return NOTES.find(n => n.slug === slug)
}
