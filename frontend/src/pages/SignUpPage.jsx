import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import PageTitle from '../components/TitlePage';

function SignUpPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    }

    return (
        <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <PageTitle title="Sign Up"/>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="username"
                placeholder="User name"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
            >
                {isSigningUp ? 'Creation in progress...' : "Sign Up"}
            </button>
            </form>

            <p className="text-center text-slate-300 text-sm mt-4">
            Already have an account? <a href="/login" className="text-sky-400 hover:underline">Log in</a>
            </p>
        </div>
    );

}
export default SignUpPage;