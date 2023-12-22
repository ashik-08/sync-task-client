import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import UserProfile from "../pages/Dashboard/UserProfile";
import AddTask from "../pages/Dashboard/AddTask";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyTasks from "../pages/Dashboard/MyTasks";
import UpdateTask from "../pages/Dashboard/UpdateTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "my-tasks",
        element: <MyTasks />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
      {
        path: "update-task/:id",
        element: <UpdateTask />,
        loader: ({ params }) =>
          fetch(`http://localhost:5005/task/${params.id}`),
      },
    ],
  },
]);
