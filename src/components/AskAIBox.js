"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
// Utility to strip markdown for clean text display
// Removed Hugging Face AI integration

export default function AskAIBox({ context }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const fullPrompt = context ? `${context}\n\nUser: ${question}` : question;
      // Call Gemini API route
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt })
      });
      if (!res.ok) {
        throw new Error("Failed to get AI response");
      }
      const data = await res.json();
      setAnswer(data.text || "No answer from AI.");
    } catch (err) {
      setError("Sorry, the AI could not answer your question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-lg w-full max-w-lg mx-auto">
      <h3 className="font-extrabold text-2xl mb-4 text-purple-700 tracking-tight">Ask AI for Help</h3>
      <form onSubmit={handleAsk} className="flex flex-col gap-3">
        <input
          type="text"
          className="border border-purple-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder-gray-400"
          placeholder="Type your question about this module..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
          required
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !question.trim()}
        >
          {loading ? (
            <span className="animate-pulse">Thinking...</span>
          ) : (
            <span>Ask AI</span>
          )}
        </button>
      </form>
      {answer && (
        <div className="mt-6 p-4 bg-white border border-purple-100 rounded-xl text-gray-900 text-lg leading-relaxed shadow-sm">
          <span className="font-bold text-purple-600 mr-2">AI:</span>
          <ReactMarkdown
            components={{
              a: ({node, ...props}) => <span {...props} style={{color: '#7c3aed', textDecoration: 'underline'}} />, // styled but not clickable
              code: ({node, ...props}) => <span style={{background: '#f3f3f3', borderRadius: 4, padding: '2px 4px', fontSize: '0.95em'}} {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc ml-6" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal ml-6" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              strong: ({node, ...props}) => <strong className="text-purple-700 font-semibold" {...props} />,
              em: ({node, ...props}) => <em className="italic text-purple-500" {...props} />,
              p: ({node, ...props}) => <p className="mb-2" {...props} />,
            }}
            disallowedElements={["img", "iframe", "script"]}
            unwrapDisallowed={true}
          >
            {answer}
          </ReactMarkdown>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 font-semibold">{error}</div>
      )}
    </div>
  );
}
