import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-3xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-500 focus:bg-zinc-800 focus:ring-2 focus:ring-yellow-500/40';

const labelClasses = 'text-sm font-black uppercase text-zinc-300 tracking-wider';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { data } = await loginUser({ email, password });
      const userRole = data.user?.role || '';

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Admins and Editors go to dashboard; viewers are blocked by server
      if (userRole === 'Admin' || userRole === 'Editor') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to sign in. Check your credentials.');
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-500">System Access</p>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Return to <span className="text-yellow-500">Battle</span>
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Where champions prove their dominance. The only team that defines the arena.
        </p>
      </div>

      <form
        className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-950/95 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        onSubmit={handleLogin}
      >
        <div>
          <label htmlFor="signin-email" className={labelClasses}>
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="apex@pendragon.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password" className={labelClasses}>
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Minimum 8 characters with uppercase, lowercase, numbers, and symbols.
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-400 cursor-pointer transition hover:text-yellow-500">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-600 accent-yellow-500" />
            <span className="font-black">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-black text-yellow-500 transition hover:text-yellow-400">
            Forgot?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-yellow-500 !text-black border-none h-14 text-lg font-black uppercase skew-x-[-10deg] shadow-[8px_8px_0_0_#000] transition duration-300 hover:bg-white hover:-translate-y-0.5"
        >
          Enter Arena
        </Button>

        <div className="flex items-center gap-3 text-xs uppercase text-zinc-500">
          <span className="block h-px flex-1 bg-zinc-700"></span>
          <span>Or</span>
          <span className="block h-px flex-1 bg-zinc-700"></span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            className="h-12 bg-zinc-900 !text-white border border-zinc-700 font-black uppercase tracking-[0.18em] hover:border-yellow-500 hover:bg-zinc-800 transition"
          >
            Google
          </Button>
          <Button
            type="button"
            className="h-12 bg-zinc-900 !text-white border border-zinc-700 font-black uppercase tracking-[0.18em] hover:border-yellow-500 hover:bg-zinc-800 transition"
          >
            Apple
          </Button>
        </div>
      </form>

      <div className="text-center text-zinc-400">
        New to Team Pendragon?{' '}
        <Link to="/signup" className="font-black text-yellow-500 hover:text-yellow-400 transition">
          Join the Elite
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
