import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setUser(res.data);
      } catch (error) {
        setUser(null);
        console.error(error);
        toast.error("Failed to find your profile! please login.");
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <Navbar user={user} />

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              !user ? (
                <Login setUser={setUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/register"
            element={
              !user ? (
                <Register setUser={setUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;