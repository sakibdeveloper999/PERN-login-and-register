import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';


// Email suggestions for common typos
    const emailSuggestions = {
    "gmai.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmail.con": "gmail.com",
    "gmail.co": "gmail.com",
    "hotnail.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "outlok.com": "outlook.com",
    };

    // Function to get suggested email based on common typos
    const getSuggestedEmail = (email) => {
    const [username, domain] = email.split("@");

    if (!domain) return null;

    return emailSuggestions[domain]
        ? `${username}@${emailSuggestions[domain]}`
        : null;
    };
//----------------------------
const Register = ({ setUser }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for email suggestions before proceeding
        const suggestion = getSuggestedEmail(form.email);
        if (suggestion) {
            toast.error(`Did you mean ${suggestion}?`);
            return;
        }
        // Create the promise
        const registerPromise= axios.post(
            "http://localhost:5000/api/auth/register",
                form
        );

        // Show loading, success and error toast
        toast.promise(registerPromise, {
            loading: "Registering...",
            success: "Registration successful!",
            error: (err) => err.response?.data?.message || "Registration failed"
        });

        try {
            const res = await registerPromise;
            setUser(res.data);
            navigate("/", { replace: true });
        } catch (error) {
            setError("Registration failed");
            console.error("Register error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md">
            <h2 className="text-3xl mb-3 text-green-500">
                Register
            </h2>

            {error && (
                <p className="text-red-500 mb-3">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <label htmlFor="name" className="text-gray-800">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    value={form.name}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

                <label htmlFor="email" className="text-gray-800">
                    Email
                </label>
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
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <label htmlFor="password" className="text-gray-800">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    required
                    value={form.password}
                    className="border border-gray-300 rounded-md p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Register
                </button>

                <p
                    onClick={() => navigate("/login")}
                    className="cursor-pointer mt-3 text-gray-500"
                >
                    I already have an account!!
                </p>
            </form>
        </div>
    );
};

export default Register;