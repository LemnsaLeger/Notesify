// src/App.jsx
import { useAuth } from "./context/authcontex.jsx";
import AuthPage from "./components/auth/authpage.jsx";
import NoteList from "./components/notes/NoteList";
import NoteEditor from "./components/notes/NoteEditor";
import AIPanel from "./components/ai/AIPanel";

function App() {
  const { user, loading, signOut } = useAuth();

  // Show nothing while Supabase checks session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
        <p className="text-white/20 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  // Not logged inshow auth page
  if (!user) return <AuthPage />;

  // Logged inshow the app
  return (
    <div className="flex h-screen bg-[#0F0F1A] text-white overflow-hidden">
      <NoteList />
      <NoteEditor />
      <AIPanel />
    </div>
  );
}

export default App;
