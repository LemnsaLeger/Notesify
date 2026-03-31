// src/App.jsx
import NoteList from "./components/notes/NoteList";
import NoteEditor from './components/notes/NoteEditor';

function App() {

  return (
    <div className="flex h-screen bg-[#0F0F1A] text-white overflow-hidden">
      <NoteList />
      <NoteEditor />
    </div>
  );
}

export default App