import { useState } from 'react';
import PageTitle from '../components/TitlePage';
import { useAuthStore } from '../store/useAuthStore';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    console.log('Logging in with:', formData);
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
          disabled={isLoggingIn}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-slate-300 text-sm mt-4">
        Don't have an account? <a href="/signup" className="text-sky-400 hover:underline">Sign up</a>
      </p>
    </div>
  );
}

export default LoginPage;