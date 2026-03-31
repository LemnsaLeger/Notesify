// src/App.jsx
import { useNotes } from './context/NotesContext';
import  NoteCard  from "./components/notes/NoteCard";

function App() {
  const { notes} = useNotes();

  return (
    <main className="min-h-screen bg-[#0F0F1A] text-white p-8">
      <h1 className="text-2xl font-bold">Notesify</h1>

      <section className="flex flex-col gap-3 w-72">
        {notes?.map((note) => (
          <NoteCard 
          key={note.id}
          note={note}
          />
        ))}
      </section>

    </main>
  )
}

export default App