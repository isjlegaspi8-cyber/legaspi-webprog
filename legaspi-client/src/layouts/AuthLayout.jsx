import { Outlet } from 'react-router-dom';
import TeamPendragon from '../assets/TeamPendragon.jpg';

const AuthLayout = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden border-r border-zinc-800 lg:block">
          <img
            src={TeamPendragon}
            alt="Team Pendragon"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <div className="max-w-xs">
              <span className="inline-flex rounded-full bg-yellow-500/15 px-4 py-2 text-[10px] uppercase tracking-[0.45em] font-black text-yellow-200">
                TEAM PENDRAGON
              </span>
              <h1 className="mt-8 text-5xl font-black uppercase tracking-tight leading-[0.95] text-white">
                The Arena Awaits
              </h1>
              <p className="mt-5 text-sm uppercase tracking-[0.35em] text-zinc-300">
                Claim your legacy alongside Chrome Ryugu, Shiguru Nanairo, and Jaxon Cross.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-zinc-800 bg-black/40 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)]">
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">APEX STATUS</p>
                <p className="mt-3 text-3xl font-black uppercase text-yellow-400">Floor 100</p>
              </div>
              <div className="rounded-[2rem] border border-zinc-800 bg-black/40 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)]">
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">CURRENT STREAK</p>
                <p className="mt-3 text-3xl font-black uppercase text-white">UNBROKEN</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;