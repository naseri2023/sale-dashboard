import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api.js'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        await api.post('/auth/login', { username : username, password : password}).then((res) => {
            const { token } = res.data;
            localStorage.setItem('token', token);
            navigate("/");
        }).catch((error) => {console.log('Login failed:', error);});
        setLoading(false);
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Login to Dashboard</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        className="bg-blue-600 text-white rounded-md p-2 font-bold hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "logging..." : "login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;