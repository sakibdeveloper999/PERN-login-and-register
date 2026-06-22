import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = ({ setUser }) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/register", form);
            setUser(res.data);
            navigate("/");
        }catch(error){ 
            setError("Invalid email or password");
            console.error("Register error:", error);
        }
    };
  
    return (
        <div className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md'>
            <h2 className='text-3xl mb-3 align-center text-green-500' >Register</h2>
            {error && <p className='text-red-500 mb-3'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='name'
                    required
                    value={form.name}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={
                        (e) => setForm(
                            { ...form, name: e.target.value }
                           )
                       }
                />
                <input
                    type="email"
                    placeholder='Email'
                    required
                    value={form.email}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={
                        (e) => setForm(
                            { ...form, email: e.target.value }
                           )
                       }
                />
                <input
                    type="password"
                    placeholder='Password'
                    required
                    value={form.password}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={
                        (e) => setForm(
                            { ...form, password: e.target.value }
                           )
                       }
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register