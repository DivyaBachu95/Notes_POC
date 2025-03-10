'use client';

import { useState } from 'react';
import { Note } from './types';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      color: getRandomColor(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  return (
    <div className="container">
      <NotesList
        notes={notes}
        onSelect={setSelectedNoteId}
        onDelete={handleDeleteNote}
        onAdd={handleAddNote}
      />
      <NoteEditor note={selectedNote} onUpdate={handleUpdateNote} />
    </div>
  );
}

function getRandomColor() {
  const colors = ['#FFD700', '#FFB6C1', '#98FB98', '#87CEFA', '#FFDEAD'];
  return colors[Math.floor(Math.random() * colors.length)];
}
