import { useState } from "react";
import { useExamSession } from "../hooks/useExamSession";

export default function LoginPage() {
  const { login, loading, error } = useExamSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ username, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        className="w-full p-2 rounded bg-slate-800"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 rounded bg-slate-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        disabled={loading}
        className="w-full py-2 bg-cyan-600 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
