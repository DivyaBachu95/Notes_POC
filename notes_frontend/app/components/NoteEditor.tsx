'use client';

import { Note } from '../types';

interface NoteEditorProps {
  note: Note | undefined;
  onUpdate: (note: Note) => void;
}

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  if (!note) return <div className="note-editor">Select a note to edit</div>;

  return (
    <div className="note-editor">
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => onUpdate({ ...note, title: e.target.value })}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '18px' }}
      />
      <textarea
        value={note.content}
        onChange={(e) => onUpdate({ ...note, content: e.target.value })}
      />
    </div>
  );
}
