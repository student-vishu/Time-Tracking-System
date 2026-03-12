import { createBrowserRouter } from "react-router";
import { KanbanBoard } from "./pages/KanbanBoard";
import { Dashboard } from "./pages/Dashboard";
import { TimeLog } from "./pages/TimeLog";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: KanbanBoard,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/time-log",
        Component: TimeLog,
      },
      {
        path: "/admin",
        Component: Admin,
      },
    ],
  },
]);
