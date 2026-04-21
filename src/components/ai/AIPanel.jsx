import { useNotes } from "../../context/NotesContext";
import { useAI } from "../../hooks/useAI";

const AI_ACTIONS = [
  {
    id: "summarize",
    label: "Summarize",
    description: "Get a short summary",
    icon: "◎",
  },
  {
    id: "improve",
    label: "Improve writing",
    description: "Clarify and restructure",
    icon: "✦",
  },
  {
    id: "expand",
    label: "Expand note",
    description: "Add depth and detail",
    icon: "⊕",
  },
  {
    id: "suggest_tags",
    label: "Suggest tags",
    description: "Auto-generate tags",
    icon: "⊞",
  },
];

export default function AIPanel() {
  const { selectedNote, updateNote } = useNotes();
  const { result, action, loading, error, run, clear } = useAI();

  const handleAction = (actionId) => {
    if (!selectedNote?.content?.trim()) return;
    run(actionId, selectedNote.content);
  };

  // Apply suggested tags directly to the note
  const handleApplyTags = () => {
    try {
      const suggested = JSON.parse(result);
      if (!Array.isArray(suggested)) return;

      const merged = [...new Set([...selectedNote.tags, ...suggested])];
      updateNote(selectedNote.id, { tags: merged });
      clear();
    } catch {
      // JSON.parse failed — result wasn't valid JSON
    }
  };

  // Apply improved/expanded content to the note
  const handleApplyContent = () => {
    if (!result || !selectedNote) return;
    updateNote(selectedNote.id, { content: result });
    clear();
  };

  return (
    <aside
      aria-label="AI tools"
      className="
        w-64 shrink-0 flex flex-col h-full
        bg-[#18182A] border-l border-white/6
      "
    >
      {/* Header */}
      <header className="px-4 pt-5 pb-3 border-b border-white/6">
        <div className="flex items-center gap-2">
          <span className="text-[#6C63FF] text-sm" aria-hidden="true">
            ✦
          </span>
          <h2 className="text-sm font-semibold text-white">AI Tools</h2>
        </div>
        <p className="text-xs text-white/30 mt-0.5">Powered by Google Gemini</p>
      </header>

      {/* Action buttons */}
      <nav
        aria-label="AI actions"
        className="flex flex-col gap-2 p-3 border-b border-white/6"
      >
        {AI_ACTIONS.map(({ id, label, description, icon }) => {
          const isActive = action === id && loading;

          return (
            <button
              key={id}
              onClick={() => handleAction(id)}
              disabled={loading || !selectedNote?.content?.trim()}
              aria-label={`${label}: ${description}`}
              aria-busy={isActive}
              className={`
                w-full flex items-start gap-3
                px-3 py-2.5 rounded-xl
                border text-left
                transition-all duration-150
                disabled:opacity-30 disabled:cursor-not-allowed
                ${
                  isActive ?
                    "bg-[#6C63FF]/20 border-[#6C63FF]/40"
                  : "bg-white/3 border-white/6 hover:bg-[#6C63FF]/10 hover:border-[#6C63FF]/20"
                }
              `}
            >
              <span
                className="text-[#6C63FF] text-base mt-0.5 shrink-0"
                aria-hidden="true"
              >
                {isActive ?
                  <span className="inline-block animate-spin">◌</span>
                : icon}
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-medium text-white/80">
                  {label}
                </span>
                <span className="text-[11px] text-white/30">{description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Result area */}
      <section
        aria-label="AI result"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-3"
      >
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            role="alert"
            className="
              rounded-xl p-3
              bg-[#FF7675]/10 border border-[#FF7675]/20
            "
          >
            <p className="text-xs font-medium text-[#FF7675] mb-1">
              Something went wrong
            </p>
            <p className="text-[11px] text-[#FF7675]/70">{error}</p>
            <button
              onClick={clear}
              className="text-[11px] text-[#FF7675]/50 hover:text-[#FF7675] mt-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Result state */}
        {result && !loading && (
          <div
            className="
            rounded-xl p-3
            bg-[#6C63FF]/10 border border-[#6C63FF]/20
            flex flex-col gap-3
          "
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#6C63FF] uppercase tracking-wider">
                {AI_ACTIONS.find((a) => a.id === action)?.label}
              </span>
              <button
                onClick={clear}
                aria-label="Clear AI result"
                className="text-white/20 hover:text-white/50 text-xs transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap">
              {result}
            </p>

            {/* Apply buttons — contextual to the action */}
            {action === "suggest_tags" && (
              <button
                onClick={handleApplyTags}
                className="
                  w-full py-1.5 rounded-lg
                  bg-[#55E6C1]/10 border border-[#55E6C1]/20
                  text-xs text-[#55E6C1] font-medium
                  hover:bg-[#55E6C1]/20 transition-colors
                "
              >
                Apply tags to note
              </button>
            )}

            {(action === "improve" || action === "expand") && (
              <button
                onClick={handleApplyContent}
                className="
                  w-full py-1.5 rounded-lg
                  bg-[#55E6C1]/10 border border-[#55E6C1]/20
                  text-xs text-[#55E6C1] font-medium
                  hover:bg-[#55E6C1]/20 transition-colors
                "
              >
                Replace note content
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="flex flex-col items-center justify-center flex-1 gap-2 py-8 text-center">
            <span className="text-2xl text-white/10" aria-hidden="true">
              ✦
            </span>
            <p className="text-xs text-white/20">
              Select an action above to get started
            </p>
          </div>
        )}
      </section>
    </aside>
  );
}
