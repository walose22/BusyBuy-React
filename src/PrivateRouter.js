// PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute() {
  const { user  } = useSelector((state) => state.auth);

  if (!user) {
    // If no user, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />; // Allow access if authenticated
}
