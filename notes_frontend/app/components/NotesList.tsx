'use client';

import { Note } from '../types';

interface NotesListProps {
  notes: Note[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function NotesList({ notes, onSelect, onDelete, onAdd }: NotesListProps) {
  return (
    <div className="notes-list">
      <button className="add-note-btn" onClick={onAdd}>+ Add Note</button>
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-item"
          style={{ background: note.color }}
          onClick={() => onSelect(note.id)}
        >
          {note.title || "Untitled"}
          <button onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>X</button>
        </div>
      ))}
    </div>
  );
}
