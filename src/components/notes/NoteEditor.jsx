// src/components/notes/NoteEditor.jsx
import { useState, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function NoteEditor() {
  const { selectedNote, updateNote, deleteNote } = useNotes();

  // Local draft state — lives only inside this component
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // ── Sync local state when selected note changes ──
  // This is the critical useEffect — without it,
  // clicking a different note wouldn't update the editor
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setIsSaved(false);
    }
  }, [selectedNote?.id]); 

  // ── Save handler ──
  const handleSave = () => {
    if (!selectedNote) return;
    updateNote(selectedNote.id, { title, content });
    setIsSaved(true);
    // Reset saved indicator after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  // ── Delete handler ──
  const handleDelete = () => {
    if (!selectedNote) return;
    if (window.confirm(`Delete "${title}"?`)) {
      deleteNote(selectedNote.id);
    }
  };

  // ── Add tag handler ──
  const handleAddTag = (e) => {
    // Fire on Enter or comma key
    if (e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();

    const newTag = tagInput.trim().toLowerCase();

    if (!newTag) return;
    if (selectedNote.tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    updateNote(selectedNote.id, {
      tags: [...selectedNote.tags, newTag],
    });
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    updateNote(selectedNote.id, {
      tags: selectedNote.tags.filter((t) => t !== tagToRemove),
    });
  };

  // ── Empty state ──
  if (!selectedNote) {
    return (
      <main
        className="
        flex-1 flex flex-col items-center justify-center
        bg-[#0F0F1A] gap-3
      "
      >
        <span className="text-4xl" role="img" aria-label="notebook">
          📝
        </span>
        <p className="text-white/30 text-sm">
          Select a note or create a new one
        </p>
        <p className="text-white/15 text-xs">Your thoughts, organized.</p>
      </main>
    );
  }

  return (
    <main
      className="
      flex-1 flex flex-col h-full
      bg-[#0F0F1A] overflow-hidden
    "
    >
      {/* ── Cover image ── */}
      {selectedNote.imageUrl && (
        <figure className="w-full h-40 shrink-0 overflow-hidden">
          <img
            src={selectedNote.imageUrl}
            alt={`Cover image for ${title}`}
            className="w-full h-full object-cover opacity-80"
          />
        </figure>
      )}

      {/* ── Editor body ── */}
      <div className="flex-1 flex flex-col overflow-y-auto px-8 py-6 gap-4">
        {/* Title input */}
        <div>
          <label htmlFor="note-title" className="sr-only">
            Note title
          </label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Untitled note"
            className="
              w-full bg-transparent border-none outline-none
              text-2xl font-bold text-white
              placeholder:text-white/20
            "
          />
        </div>

        {/* Tags row */}
        <div
          role="group"
          aria-label="Note tags"
          className="flex items-center flex-wrap gap-2"
        >
          {selectedNote.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove tag ${tag}`}
              className="group flex items-center gap-1"
            >
              <Badge label={tag} />
              <span
                className="
                text-[10px] text-white/20
                group-hover:text-[#FF7675]
                transition-colors
              "
              >
                x
              </span>
            </button>
          ))}

          {/* Tag input */}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag..."
            aria-label="Add a new tag"
            className="
              bg-transparent border-none outline-none
              text-xs text-white/40 placeholder:text-white/20
              w-20
            "
          />
        </div>

        {/* Divider */}
        <hr className="border-white/6" />

        {/* Content textarea */}
        <div className="flex-1">
          <label htmlFor="note-content" className="sr-only">
            Note content
          </label>
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="
              w-full h-full min-h-75 bg-transparent
              border-none outline-none resize-none
              text-sm text-white/70 placeholder:text-white/20
              leading-relaxed
            "
          />
        </div>
      </div>

      {/* ── Footer: action bar ── */}
      <footer
        className="
        shrink-0 flex items-center justify-between
        px-8 py-4
        border-t border-white/6
        bg-[#18182A]/50
      "
      >
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          aria-label="Delete this note"
        >
          Delete
        </Button>

        <div className="flex items-center gap-3">
          {/* Saved indicator */}
          {isSaved && (
            <span
              role="status"
              aria-live="polite"
              className="text-xs text-[#55E6C1] animate-pulse"
            >
              ✓ Saved
            </span>
          )}
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save note
          </Button>
        </div>
      </footer>
    </main>
  );
}
