// src/components/notes/NoteList.jsx
import NoteCard from "./NoteCard";
import { useNotes } from "../../context/NotesContext";
import { filterNotes } from "../../utils/noteUtils";

const ALL_TAGS = ["all", "work", "learning", "ideas"];

export default function NoteList() {
  const {
    notes,
    searchQuery,
    setSearchQuery,
    activeTag,
    setActiveTag,
    addNote,
  } = useNotes();

  const filteredNotes = filterNotes(notes, searchQuery, activeTag);

  return (
    <aside
      className="
      flex flex-col h-full w-72 shrink-0
      bg-[#18182A] border-r border-white/6
    "
    >
      {/* ── Header ── */}
      <header className="px-4 pt-5 pb-3 border-b border-white/6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base font-semibold text-white tracking-tight">
            Notesify
          </h1>
          <button
            onClick={addNote}
            aria-label="Create new note"
            className="
              flex items-center justify-center
              w-7 h-7 rounded-lg
              bg-[#6C63FF] hover:bg-[#5A52E0]
              text-white text-lg font-light
              transition-colors duration-150
            "
          >
            +
          </button>
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="6.5"
              cy="6.5"
              r="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="10.5"
              y1="10.5"
              x2="14"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search notes"
            className="
              w-full bg-white/4 border border-white/8
              rounded-lg pl-9 pr-3 py-2
              text-sm text-white/80 placeholder:text-white/25
              focus:outline-none focus:border-[#6C63FF]/50
              transition-colors duration-150
            "
          />
        </div>
      </header>

      {/* ── Tag filter bar ── */}
      <nav
        aria-label="Filter notes by tag"
        className="
          flex items-center gap-1.5
          px-4 py-3
          border-b border-white/6
          overflow-x-auto scrollbar-none
        "
      >
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`
              shrink-0 px-3 py-1 rounded-full
              text-xs font-medium capitalize
              border transition-all duration-150
              ${
                activeTag === tag ?
                  "bg-[#6C63FF] border-[#6C63FF] text-white"
                : "bg-transparent border-white/10 text-white/40 hover:text-white/70"
              }
            `}
          >
            {tag}
          </button>
        ))}
      </nav>

      {/* ── Note count ── */}
      <div className="px-4 py-2">
        <p className="text-[11px] text-white/25 uppercase tracking-widest">
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      {/* ── Scrollable note list ── */}
      <section
        aria-label="Notes list"
        className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-2"
      >
        {filteredNotes.length > 0 ?
          filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
        : <EmptyState query={searchQuery} />}
      </section>
    </aside>
  );
}

// Empty state
function EmptyState({ query }) {
  return (
    <div
      className="
      flex flex-col items-center justify-center
      flex-1 gap-2 py-16 text-center
    "
    >
      <span className="text-3xl" role="img" aria-label="Empty">
        🗒️
      </span>
      <p className="text-sm font-medium text-white/40">
        {query ? `No results for "${query}"` : "No notes yet"}
      </p>
      <p className="text-xs text-white/20">
        {query ? "Try a different search" : "Click + to create your first note"}
      </p>
    </div>
  );
}
