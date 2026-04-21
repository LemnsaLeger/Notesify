
// This hook is the bridge between the UI
// and the AI service. Components never call
// aiService directly they call this hook.

import { useState } from "react";
import { aiService } from "../services/aiServices";

export function useAI() {
  const [result, setResult] = useState("");
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async (actionName, content) => {
    // Reset previous result before new request
    setResult("");
    setError(null);
    setAction(actionName);
    setLoading(true);

    try {
      const text = await aiService.run(actionName, content);
      setResult(text);
    } catch (err) {
      setError("An error occurred while processing your request.");
      console.error("AI service error:", err);
    } finally {
      // Always runs — loading stops whether success or failure
      setLoading(false);
    }
  };

  const clear = () => {
    setResult("");
    setError(null);
    setAction(null);
  };

  return { result, action, loading, error, run, clear };
}
