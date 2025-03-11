export interface Note {
    id?: string;
    title: string;
    content: string;
    color: string;
  }
  
  const BASE_URL = 'http://localhost:8080'; // Your Vapor backend URL
  
  export async function getNotes(): Promise<Note[]> {
    const res = await fetch(`${BASE_URL}/notes`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
  }
  
  export async function addNote(note: Note): Promise<Note> {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to add note');
    return res.json();
  }
  
  export async function updateNote(id: string, note: Note): Promise<Note> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to update note');
    return res.json();
  }
  
  export async function deleteNote(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete note');
  }
  