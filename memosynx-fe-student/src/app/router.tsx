import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/layouts/AuthLayout";
import AppLayout from "../shared/layouts/AppLayout";
import { LoginPage } from "../features/auth";
import { ExamPage } from "../features/exam";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <AppLayout />,
    children: [{ path: "/", element: <ExamPage /> }],
  },
]);
