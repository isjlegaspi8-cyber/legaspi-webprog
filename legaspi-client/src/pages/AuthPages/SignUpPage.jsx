import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import ShiguruImg from '../../assets/Shiguru Nanairo.png';
import TeamPendragon from '../../assets/Team Pendragon.jpg';

const inputClasses = 
'mt-2 w-full rounded-xl border-2 border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-500 focus:bg-zinc-800 focus:ring-2 focus:ring-yellow-500/50';

const labelClasses = 'text-sm font-black uppercase text-zinc-300 tracking-wider';

const SignUpPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center gap-12 p-6 md:p-12">
        
        {/* LEFT SIDE - IMAGE & BRANDING */}
        <div className="hidden lg:flex flex-col justify-center items-center max-w-lg gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-[2rem]"></div>
            <img 
              src={TeamPendragon} 
              alt="Team Pendragon" 
              className="relative h-96 w-full object-cover rounded-[2rem] border-4 border-yellow-500 shadow-[20px_20px_0_0_#000]"
            />
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-yellow-500">
              PENDRAGON
            </h2>
            <p className="text-zinc-400 italic text-lg leading-relaxed border-l-4 border-yellow-500 pl-4">
              "Elite players rise above. Prove you deserve to stand with us."
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-1 w-8 bg-yellow-500"></div>
              <span className="text-yellow-600 font-black text-sm uppercase tracking-widest">0.1% Friction</span>
              <div className="h-1 w-8 bg-yellow-500"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full max-w-md lg:max-w-lg space-y-8">
          <div className="border-l-8 border-yellow-500 pl-8 space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-yellow-500">Access Portal</p>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">
              Join the <span className="text-yellow-500">Elite</span>
            </h1>
          </div>

          <form className="space-y-6 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 border-4 border-zinc-800 p-8 md:p-10 rounded-[2rem] shadow-[15px_15px_0_0_#000] backdrop-blur-sm">
            {/* NAME GRID */}
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

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div>
              <label htmlFor="signup-password" className={labelClasses}>
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="new-password"
                className={inputClasses}
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500 italic">
                Minimum 8 characters with uppercase, lowercase, numbers, and symbols.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label htmlFor="confirm-password" className={labelClasses}>
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="new-password"
                className={inputClasses}
              />
            </div>

            {/* TERMS CHECKBOX */}
            <label className="flex items-start gap-3 text-zinc-400 cursor-pointer hover:text-yellow-500 transition pt-2">
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-600 accent-yellow-500 cursor-pointer mt-0.5" />
              <span className="text-xs leading-relaxed">
                I agree to Team Pendragon's <span className="text-yellow-500 font-black">Terms of Service</span> and <span className="text-yellow-500 font-black">Privacy Policy</span>
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="w-full bg-yellow-500 !text-black border-none h-14 text-lg font-black uppercase skew-x-[-10deg] shadow-[8px_8px_0_0_#000] hover:bg-white transition-all duration-300 hover:translate-x-1 hover:translate-y-1">
              Claim Your Spot
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-grow bg-zinc-700"></div>
              <span className="text-zinc-600 font-black text-xs uppercase">Or</span>
              <div className="h-px flex-grow bg-zinc-700"></div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" className="bg-zinc-800 !text-white border-2 border-zinc-700 h-12 font-black uppercase skew-x-[-8deg] hover:border-yellow-500 hover:bg-zinc-700 transition-all">
                Google
              </Button>
              <Button type="button" className="bg-zinc-800 !text-white border-2 border-zinc-700 h-12 font-black uppercase skew-x-[-8deg] hover:border-yellow-500 hover:bg-zinc-700 transition-all">
                Apple
              </Button>
            </div>
          </form>

          {/* LOGIN LINK */}
          <div className="border-t border-zinc-800 pt-6 text-center">
            <p className="text-zinc-400 italic">
              Already in the system?{' '}
              <Link to="/signin" className="font-black text-yellow-500 hover:text-yellow-400 transition">
                Log In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
