// src/App.jsx
import { useNotes } from './context/NotesContext'

function App() {
  const { notes, selectedNote} = useNotes();

  return (
    <main className="min-h-screen bg-[#0F0F1A] text-white p-8">
      <h1 className="text-2xl font-bold">Notesify</h1>
     <p>{notes.length} notes</p>
     <p>{selectedNote?.title ?? 'No note selected'}</p>
    </main>
  )
}

export default App