 // src/cpomponents/notes/NoteCard.jsx
import Badge from "../ui/Badge";
import { formatDate} from "../../utils/noteUtils";
import { useNotes } from "../../context/NotesContext";


export default function NoteCard({ note }) {
    const {selectedNote, setSelectedNote} = useNotes();

    const isSelected = selectedNote?.id === note.id;

    return (
      <article
        onClick={() => setSelectedNote(note)}
        className={`group relative rounded-xl p-3 cursor-pointer border transition-all duration-150 ${isSelected ? "bg-[#6C63FF]/15 border-[#6C63FF]" : "bg-white/3 border-white/6 hover:bg-white/6"}`}
      >
        {/* cover image for notes with one*/}
        {note.imageUrl && (
          <figure className="mb-2 overflow-hidden rounded-lg">
            <img
              src={note.imageUrl}
              alt={`cover image for note: ${note.title}`}
              className="w-full h-24 object-cover"
              loading="lazy"
            />
          </figure>
        )}
        {/* Note title */}
        <h3 className="text-sm font-medium text-white/90 truncate mb-1">
          {note.title || "Untitled note"}
        </h3>

        {/* Content preview */}
        <p className="text-xs text-white/40 line-clamp-2 mb-2 leading-relaxed">
          {note.content || "No content yet..."}
        </p>

        {/* Footer: tags + timestamp */}
        <footer className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-wrap">
            {note.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
          <time
            dateTime={note.updatedAt}
            className="text-[11px] text-white/25 shrink-0"
          >
            {formatDate(note.updatedAt)}
          </time>
        </footer>
      </article>
    );
}