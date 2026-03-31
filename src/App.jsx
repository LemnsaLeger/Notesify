// src/App.jsx
import { useNotes } from './context/NotesContext';
import  NoteCard  from "./components/notes/NoteCard";
import NoteList from "./components/notes/NoteList";

function App() {
  const { notes} = useNotes();

  return (
    <div className="flex h-screen bg-[#0F0F1A] text-white overflow-hidden">
      <NoteList />
      <main className="min-h-screen bg-[#0F0F1A] text-white p-8">
        <section className="flex flex-col gap-3 w-72">
          {notes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App