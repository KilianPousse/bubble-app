import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import PageTitle from '../components/TitlePage';
import { EyeIcon, EyeOffIcon } from '../lib/icons';
import { Link } from "react-router";
import TypingDots from "../components/TypingDots";

function SignUpPage() {
    const [formData, setFormData] = useState({ tag: '', email: '', password: '', confirmPassword: '' });
    const [tagError, setTagError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.tag.length < 3 || formData.tag.length > 24) {
            setTagError('Tag must be between 3 and 24 characters');
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordError('');
        signup(formData);
    }

    const handleTagChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[\s-]/g, '_').toLowerCase();
        const validPattern = /^[a-z0-9_]*$/;
        if(!validPattern.test(value)) {
            setTagError('Only lowercase letters, numbers, and underscores are allowed');
            return;
        }
        setTagError('');
        setFormData({ ...formData, tag: value });
    }

    return (
        <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <PageTitle title="Sign Up"/>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Tag */}
                <div className="flex items-center bg-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-sky-500 transition">
                    <span className="px-2 text-white select-none border-r border-slate-500">@</span>
                    <input
                        type="text"
                        name="tag"
                        placeholder="Tag"
                        value={formData.tag}
                        onChange={handleTagChange}
                        className="flex-1 p-3 bg-slate-700 text-white placeholder-gray-400 focus:outline-none rounded-r-lg"
                    />
                </div>
                {tagError && <p className="text-red-500 text-sm mt-1">{tagError}</p>}

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                {/* Password */}
                <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-400 transition-colors duration-200 p-2.5"
                >
                    {showPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
                </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-400 transition-colors duration-200 p-2.5"
                >
                    {showConfirmPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
                </button>
                </div>


                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

                <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
                >
                    {isSigningUp ? (<TypingDots color='white' size={7} />) : "Sign Up"}
                </button>
            </form>

            <p className="text-center text-slate-300 text-sm mt-4">
                Already have an account? <Link to="/login" className="text-sky-400 hover:underline">Log in</Link>
            </p>
        </div>
    );
}

export default SignUpPage;
