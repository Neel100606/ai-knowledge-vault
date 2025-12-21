import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    isAuthenticated().then((ok) => {
      setAuthed(ok);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
