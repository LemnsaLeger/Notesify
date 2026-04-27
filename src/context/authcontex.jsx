// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we
  //   know auth state

  useEffect(() => {
    // Check for existing session on app load
    authService.getSession().then((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to future auth changes
    // (login, logout, token refresh)
    const {
      data: { subscription },
    } = authService.onAuthChange((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const data = await authService.signUp(email, password);
    return data;
  };

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    return data;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
