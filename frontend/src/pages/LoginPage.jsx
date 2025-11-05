import { useState } from 'react';
import PageTitle from '../components/TitlePage';
import { useAuthStore } from '../store/useAuthStore';
import { EyeIcon, EyeOffIcon } from '../lib/icons';
import { Link } from "react-router";
import TypingDots from "../components/TypingDots";

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
      <PageTitle title="Login" />
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to an account</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-400 transition-colors duration-200 p-3"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition"
        >
          {isLoggingIn ? (<TypingDots color='white' size={7} />) : "Login"}
        </button>
      </form>

      <p className="text-center text-slate-300 text-sm mt-4">
        Don't have an account? <Link to="/signup" className="text-sky-400 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginPage;