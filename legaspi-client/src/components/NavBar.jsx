import { NavLink } from 'react-router-dom';
// Updated: Import the logo from your styles directory
import Logo from '../assets/Jaxon Cross.png';

const NavBar = () => {
  // Updated Link Styles: Sharp skew and metallic states
  const linkStyle = ({ isActive }) => 
    `px-8 py-3 font-black italic uppercase text-[11px] tracking-[0.2em] skew-x-[-18deg] transition-all duration-300 relative group ${
      isActive 
        ? 'bg-yellow-500 text-black shadow-[6px_6px_0_0_#000] translate-x-[-4px] translate-y-[-4px]' 
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b-[6px] border-zinc-900 bg-zinc-950/80 backdrop-blur-xl px-6 py-5">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* LOGO AREA */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-yellow-500 rounded-full blur-md opacity-20 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
            {/* Updated: Using the 'Logo' variable instead of a string path */}
            <img 
              src={Logo} 
              alt="Team Pendragon Logo" 
              className="relative h-14 w-14 rounded-full border-4 border-zinc-900 object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all shadow-[4px_4px_0_0_#d4af37]" 
            />
          </div>
          <div className="flex flex-col">
            <h1 className="m-0 p-0 text-2xl font-black italic uppercase leading-none tracking-tighter text-white border-none bg-none filter-none">
              PENDRAGON
            </h1>
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 bg-yellow-500"></div>
              <span className="text-[9px] font-black text-yellow-600 tracking-[0.5em] uppercase italic">
                Apex // Floor 100
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex gap-4 items-center">
          <NavLink to="/" className={linkStyle}>
            <span className="relative z-10">Summit</span>
          </NavLink>
          <NavLink to="/articles" className={linkStyle}>
            <span className="relative z-10">Archives</span>
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            <span className="relative z-10">Roster</span>
          </NavLink>
          
          <div className="hidden lg:flex flex-col items-end ml-8 pl-8 border-l-2 border-zinc-800">
            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">System_Lat: 0.1ms</span>
            <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest animate-pulse">Link_Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;