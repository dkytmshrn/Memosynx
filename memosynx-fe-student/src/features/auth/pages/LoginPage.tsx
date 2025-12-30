import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ username, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">MEMOSYNX</h1>
      <div className="bg-sky-600 p-5">
        <div className="font-semibold text-white mb-10">
          <input
            className="w-full py-1 px-2 rounded-md border-b-2 border-white mb-8"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full py-1 px-2 rounded-md border-b-2 border-white mb-11"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full py-2 bg-cyan-600 rounded bg-red disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

    </form>
  );
}
