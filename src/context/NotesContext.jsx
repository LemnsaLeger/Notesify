import { createContext, useContext, useState } from "react";
import { createNote } from "../utils/noteUtils";

// create the context obj(an empty container any object can plug into)

const NotesContext = createContext(null);

// sample notes
const SAMPLE_NOTES = [
  {
    ...createNote(
      "System Design",
      "Load balancers distribute traffic across servers. Key strategies: round robin, least connections, IP hash...",
    ),
    tags: ["work", "learning"],
    category: "work",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
  },
  {
    ...createNote(
      "React hooks deep dive",
      "useEffect runs after every render by default. Pass a dependency array to control when it fires...",
    ),
    tags: ["learning"],
    category: "learning",
    imageUrl: null,
  },
  {
    ...createNote(
      "App idea: habit tracker",
      "Simple daily habit tracker. Users check off habits each day. Streak counter for motivation...",
    ),
    tags: ["ideas"],
    category: "ideas",
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
  },
];

// provider component and makes state available to every child component

export function NotesProvider({children}) {
    const [notes, setNotes] = useState(SAMPLE_NOTES);
    const [selectedNote, setSelectedNote] = useState(SAMPLE_NOTES[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('all');


    const addNote = () => {
        const newNote = createNote();
        setNotes(prev => [newNote, ...prev]);
        selectedNote(newNote);
    }


    const updateNote = (id, changes) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                ? {...note, ...changes, updatedAt: new Date().toISOString() }
                : note
            )
        )

        // keep selectedNote in sync with the update
        if((selectedNote?.id === id)) {
            selectedNote(prev => ({...prev, ...changes}))
        }
    }


    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id != id))
        // if the selectedNote is deleted, select the next one
        selectedNote(prev => 
            prev?.id === id ? notes.find(n => n.id !== id) ?? null : prev
        )
    }


    // everything we expose to the rest of the app
    const value = {
      notes,
      selectedNote,
      searchQuery,
      activeTag,
      setSelectedNote,
      setSearchQuery,
      setActiveTag,
      addNote,
      updateNote,
      deleteNote,
    };


    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}

// Custom hook for consuming context
// Instead of importing useContext + NotesContext everywhere,
// components just call: const { notes } = useNotes()


export function useNotes() {
    const context = useContext(NotesContext);
    if(!context) {
        throw new Error('useNotes must be used inside a Notes');
    }
    return context;
}