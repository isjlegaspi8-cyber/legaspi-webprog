import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    /* Updated: min-h-screen with the Team Pendragon dark theme.
      The 'overflow-x-hidden' prevents the skew animations from causing horizontal scroll.
    */
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      <NavBar />
      
      {/* NEW: Global Background Visuals 
        These speed lines will now appear consistently across the entire app.
      */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="speed-line top-[20%] left-[-10%] opacity-20" style={{ animationDelay: '0s' }}></div>
        <div className="speed-line top-[50%] left-[-10%] opacity-10" style={{ animationDelay: '1.5s' }}></div>
        <div className="speed-line top-[80%] left-[-10%] opacity-20" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* LAYOUT CHANGE: 
        Removed the restrictive 'max-w-6xl' to allow your Hero and Sections 
        to hit the edges of the screen for that 'Domination' look.
      */}
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>

      {/* NEW: Footer Bar for that Pro-League feel */}
      <footer className="relative z-10 border-t-4 border-zinc-900 bg-zinc-950 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-yellow-500"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 italic">
              Property of Team Pendragon // X-Tower Floor 100
            </p>
          </div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase italic">
            Apex Status: Verified
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;