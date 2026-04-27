// src/services/authService.js
import { supabase } from "./supabaseClient";

export const authService = {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth state changes app-wide
  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  },
};
