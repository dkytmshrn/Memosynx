import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-dvh text-slate-100 bg-red-500">
      <header className="p-4 border-b border-slate-800 font-semibold">
        MEMOSYNX
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
