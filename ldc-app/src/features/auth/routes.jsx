import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { GuestOnly } from "../../shared/auth/guards.jsx";

export const authRoutes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <GuestOnly><Login /></GuestOnly> },
      { path: "/signup", element: <GuestOnly><Signup /></GuestOnly> },
      { path: "/forgot-password", element: <GuestOnly><ForgotPassword /></GuestOnly> },
      // Reachable while logged in too: the e-mailed link must always work.
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
];
