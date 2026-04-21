// src/services/aiService.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const PROMPTS = {
  summarize: (content) => `
    You are a precise note summarizer.
    Summarize the following note in 2-3 sentences.
    Be concise. No filler words.

    Note:
    ${content}
  `,

  improve: (content) => `
    You are an expert writing assistant.
    Improve the clarity and structure of this note.
    Keep the same meaning. Return only the improved text.
    No explanations. No preamble.

    Note:
    ${content}
  `,

  expand: (content) => `
    You are a knowledgeable assistant.
    Expand this note into a more detailed version.
    Add relevant context, examples, and structure.
    Return only the expanded note content.

    Note:
    ${content}
  `,

  suggest_tags: (content) => `
    You are a note organization assistant.
    Suggest 3-5 relevant tags for this note.
    Return ONLY a valid JSON array of lowercase strings.
    No explanation. No markdown. No backticks.
    Example output: ["react", "hooks", "state"]

    Note:
    ${content}
  `,
};

export const aiService = {
  async run(action, content) {
    if (!content?.trim()) {
      throw new Error("Note has no content to process.");
    }

    const prompt = PROMPTS[action]?.(content);

    if (!prompt) {
      throw new Error(`Unknown AI action: ${action}`);
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    if (!response?.text) {
      throw new Error("Gemini returned an empty response.");
    }

    return response.text.trim();
  },
};
