import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-3xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-500 focus:bg-zinc-800 focus:ring-2 focus:ring-yellow-500/40';

const labelClasses = 'text-sm font-black uppercase text-zinc-300 tracking-wider';

const SignUpPage = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-500">Access Portal</p>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Join the <span className="text-yellow-500">Elite</span>
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Elite players rise above. Prove you deserve to stand with us.
        </p>
      </div>

      <form className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-950/95 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="first-name" className={labelClasses}>
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Chrome"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className={labelClasses}>
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Ryugu"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className={labelClasses}>
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="apex@pendragon.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className={labelClasses}>
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Minimum 8 characters with uppercase, lowercase, numbers, and symbols.
          </p>
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClasses}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            className={inputClasses}
          />
        </div>

        <label className="flex items-start gap-3 text-zinc-400 cursor-pointer hover:text-yellow-500 transition pt-2">
          <input type="checkbox" className="h-5 w-5 rounded border-zinc-600 accent-yellow-500 cursor-pointer mt-0.5" />
          <span className="text-xs leading-relaxed">
            I agree to Team Pendragon&apos;s <span className="text-yellow-500 font-black">Terms of Service</span> and <span className="text-yellow-500 font-black">Privacy Policy</span>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full bg-yellow-500 !text-black border-none h-14 text-lg font-black uppercase skew-x-[-10deg] shadow-[8px_8px_0_0_#000] transition duration-300 hover:bg-white hover:-translate-y-0.5"
        >
          Claim Your Spot
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
        Already in the system?{' '}
        <Link to="/signin" className="font-black text-yellow-500 hover:text-yellow-400 transition">
          Log In Here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
