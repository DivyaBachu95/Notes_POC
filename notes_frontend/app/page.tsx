'use client';

import { useEffect, useState } from 'react';
import { getNotes, addNote, updateNote, deleteNote, Note } from './api/notesApi';

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddNote() {
    const newNote = await addNote({
      title: '',
      content: '',
      color: getRandomColor(),
    });
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  }

  async function handleUpdateNote(note: Note) {
    if (!note.id) return;
    const updatedNote = await updateNote(note.id, note);
    setNotes(notes.map(n => (n.id === note.id ? updatedNote : n)));
  }

  async function handleDeleteNote(id: string) {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
    setSelectedNote(null);
  }

  return (
    <div className="container">
      <div className="notes-list">
        <button className="add-note-btn" onClick={handleAddNote}>+ Add Note</button>
        {notes.map(note => (
          <div
            key={note.id}
            className="note-item"
            style={{ background: note.color }}
            onClick={() => setSelectedNote(note)}
          >
            {note.title || 'Untitled'}
            <button onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id!); }}>X</button>
          </div>
        ))}
      </div>

      <div className="note-editor">
        {selectedNote ? (
          <>
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
              onBlur={() => handleUpdateNote(selectedNote)}
              placeholder="Title"
              style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '18px' }}
            />
            <textarea
              value={selectedNote.content}
              onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
              onBlur={() => handleUpdateNote(selectedNote)}
              placeholder="Write your note here..."
              style={{ width: '100%', height: '300px', padding: '10px', fontSize: '16px' }}
            />
          </>
        ) : (
          <p>Select a note to edit or add a new one.</p>
        )}
      </div>
    </div>
  );
}

function getRandomColor() {
  const colors = ['#FFD700', '#FFB6C1', '#98FB98', '#87CEFA', '#FFDEAD'];
  return colors[Math.floor(Math.random() * colors.length)];
}
