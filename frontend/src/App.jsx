import {useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';

axios.defaults.withCredentials = true;

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on app load
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile")
        setUser(res.data);
      } catch (error) {
        setUser(null);
        console.log(error);
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
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  )
}

export default App