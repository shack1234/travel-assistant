'use client';
import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const askQuestion = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
      {/* Hero */}
      <section className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shadrack Travel Advisor</h1>
        <p className="text-lg text-gray-300">
          Your AI-powered travel planning assistant
        </p>
      </section>

      {/* Input Card */}
      <section className="w-full max-w-3xl bg-white text-gray-800 p-8 rounded-2xl shadow-xl mb-12">
        <label htmlFor="question" className="block mb-2 font-medium">
          Ask your travel question:
        </label>
        <textarea
          id="question"
          className="w-full p-4 h-32 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 placeholder:italic"
          placeholder="e.g. What documents do I need to travel from Kenya to Ireland?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askQuestion}
          disabled={loading || !question}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold disabled:opacity-50 transition"
        >
          {loading ? 'Processing...' : 'Submit Question'}
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </section>

      {/* Response */}
      {response && (
        <section className="w-full max-w-3xl bg-white text-gray-800 p-6 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-4">Response</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto text-gray-500 text-sm">
        Built by Shadrack - July 2025
      </footer>
    </main>
  );
}
