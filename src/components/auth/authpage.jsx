// src/components/auth/AuthPage.jsx
import { useState } from "react";
import { useAuth } from "../../context/authcontex";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signup") {
        await signUp(email, password);
        setMessage("Check your email to confirm your account.");
      } else {
        await signIn(email, password);
        // AuthContext listener handles the redirect
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen bg-[#0F0F1A]
      flex items-center justify-center
      px-4
    "
    >
      <main className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Notesify
          </h1>
          <p className="text-white/30 text-sm mt-1">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Card */}
        <section
          className="
          bg-[#18182A] rounded-2xl
          border border-white/6
          p-6 flex flex-col gap-4
        "
        >
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-white/50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="you@example.com"
              autoComplete="email"
              className="
                bg-white/4 border border-white/8
                rounded-lg px-3 py-2.5
                text-sm text-white placeholder:text-white/20
                focus:outline-none focus:border-[#6C63FF]/50
                transition-colors
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-white/50"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              className="
                bg-white/4 border border-white/8
                rounded-lg px-3 py-2.5
                text-sm text-white placeholder:text-white/20
                focus:outline-none focus:border-[#6C63FF]/50
                transition-colors
              "
            />
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="text-xs text-[#FF7675] bg-[#FF7675]/10
                         rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}

          {/* Success message */}
          {message && (
            <p
              role="status"
              className="text-xs text-[#55E6C1] bg-[#55E6C1]/10
                         rounded-lg px-3 py-2"
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full py-2.5 rounded-lg
              bg-[#6C63FF] hover:bg-[#5A52E0]
              text-white text-sm font-medium
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-150
              active:scale-[0.98]
            "
          >
            {loading ?
              "Please wait..."
            : mode === "signin" ?
              "Sign in"
            : "Create account"}
          </button>

          {/* Toggle mode */}
          <p className="text-center text-xs text-white/30">
            {mode === "signin" ?
              "Don't have an account?"
            : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setMessage(null);
              }}
              className="text-[#6C63FF] hover:text-[#8B85FF] transition-colors"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </section>
      </main>
    </div>
  );
}
