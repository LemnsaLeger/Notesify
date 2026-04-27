// src/context/NotesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { notesService } from "../services/noteservice";
import { useAuth } from "./authcontex";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const { user } = useAuth();

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Load notes when user logs in 
  useEffect(() => {
    if (!user) {
      setNotes([]);
      setSelectedNote(null);
      return;
    }

    const loadNotes = async () => {
      setLoading(true);
      try {
        const data = await notesService.getAll();
        setNotes(data);
        setSelectedNote(data[0] ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [user]); // re-runs when user logs in or out

  const addNote = async () => {
    if (!user) return;
    try {
      const newNote = await notesService.create(user.id);
      setNotes((prev) => [newNote, ...prev]);
      setSelectedNote(newNote);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateNote = async (id, changes) => {
    try {
      const updated = await notesService.update(id, changes);
      setNotes((prev) => prev.map((note) => (note.id === id ? updated : note)));
      if (selectedNote?.id === id) setSelectedNote(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesService.delete(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setSelectedNote((prev) =>
        prev?.id === id ? (notes.find((n) => n.id !== id) ?? null) : prev,
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        searchQuery,
        activeTag,
        loading,
        error,
        setSelectedNote,
        setSearchQuery,
        setActiveTag,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
}
