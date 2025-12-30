import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
    <div className="h-full flex items-center justify-center bg-amber-500">
      <div className="w-2/6 h-4/5 bg-amber-300 px-4 py-6 rounded-2xl">
        <Outlet />
      </div>
    </div>
    </>
  );
}
