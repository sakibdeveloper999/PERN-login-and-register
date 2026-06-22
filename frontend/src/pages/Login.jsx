import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            setUser(res.data);
            navigate("/");
        } catch (error) {
            setError("Invalid email or password");
            console.error("Login error:", error);
        }
    };

    return (
        <div className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md'>
            <h2 className='text-3xl mb-3 align-center text-green-500' >Login</h2>
            {error && <p className='text-red-500 mb-3'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-gray-800'>Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    required
                    value={form.email}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <label htmlFor="password" className='text-gray-800' >Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*******"
                    autoComplete="current-password"
                    required
                    value={form.password}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                    Login
                </button>
                <p onClick={() => navigate("/register")} className='cursor-pointer mt-3 text-gray-500 ' >I don't have account yet!! </p>
            </form>
        </div>
    )
}

export default Login