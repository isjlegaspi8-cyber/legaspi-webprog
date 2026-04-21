import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

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

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Layout;