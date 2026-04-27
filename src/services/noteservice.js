// src/services/notesService.js

// All database operations for notes live here.
// Context calls these. Context never touches
// Supabase directly. One layer of indirection
// means we can mock this in tests later
import { supabase } from "./supabaseClient";

export const notesService = {
  //  Fetch all notes for the logged-in user 
  async getAll() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  //  Create a new note 
  async create(userId) {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: "",
        content: "",
        tags: [],
        category: "all",
      })
      .select() //  returns the created row
      .single(); // unwraps array to single object

    if (error) throw new Error(error.message);
    return data;
  },

  // Update a note by ID
  async update(id, changes) {
    const { data, error } = await supabase
      .from("notes")
      .update(changes)
      .eq("id", id) // ← WHERE id = id
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a note by ID
  async delete(id) {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
