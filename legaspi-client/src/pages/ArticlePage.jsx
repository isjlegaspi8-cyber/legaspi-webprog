import Button from '../components/Button';
// Import the Beyblade assets to ensure Vite handles the paths correctly
import CobaltDrakeImg from '../assets/styles/TakaraTomy Beyblade X BX-00 Cobalt Drake 4-60F Brand New Sealed Japan Free Ship _ eBay.jpg';
import WeissTigerImg from '../assets/styles/Beyblade X Bx-33 Booster Weiss Tiger 3-60u.jpg';
import DranSwordImg from '../assets/styles/Beyblade X Dranzer S 3-60F (BX-01_Starter).jpg';

const ArticlePage = () => {
  const reports = [
    { 
      id: "LOG-001", 
      bey: "Cobalt Drake", 
      img: CobaltDrakeImg,
      title: "Bit Friction & Velocity Logs", 
      author: "Chrome Ryugu",
      desc: "Technical friction analysis at maximum output. In-depth logs for the Flat 4-60 bit on the X-Line." 
    },
    { 
      id: "LOG-002", 
      bey: "Weiss Tiger", 
      img: WeissTigerImg,
      title: "The Technical Intercept Protocol", 
      author: "Shiguru Nanairo",
      desc: "Optimized Weiss Tiger interception maneuvers. Calculating attack trajectories and kinetic equilibrium." 
    },
    { 
      id: "LOG-003", 
      bey: "Dran Sword", 
      img: DranSwordImg,
      title: "The X-Dash Prototype Study", 
      author: "Jaxon Cross",
      desc: "Legacy engineering study on the first functional X-Dash prototype. Analyzing initial velocity data." 
    }
  ];

  return (
    <div className="flex w-full flex-col gap-10 p-4 md:p-12 bg-zinc-950 min-h-screen text-white">
      {/* ARCHIVE HEADER */}
      <section className="bg-zinc-900 p-10 border-b-[8px] border-yellow-500 rounded-t-[2rem] relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-4">
            CHAMPION <span className="text-yellow-500 font-black">ARCHIVES.</span>
          </h1>
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">
            Accessing Secure Gear Database // Team Pendragon
          </p>
        </div>
      </section>

      {/* REPORTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reports.map((r) => (
          <article 
            key={r.id} 
            className="group flex flex-col border-4 border-zinc-900 bg-zinc-900/50 hover:border-yellow-500 transition-all duration-300 rounded-3xl overflow-hidden"
          >
            {/* Header: Name & Role */}
            <div className="p-6 border-b border-zinc-800">
               <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest">{r.bey} — {r.author}</span>
            </div>

            {/* Beyblade Display Area */}
            <div className="relative aspect-square bg-zinc-950 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-50 z-10"></div>
              <img 
                src={r.img} 
                alt={r.bey} 
                className="relative z-20 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]" 
              />
            </div>

            {/* Log Content */}
            <div className="p-8 flex flex-col flex-grow bg-zinc-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter italic">ID: {r.id}</span>
                <div className="h-1 w-12 bg-yellow-500/30"></div>
              </div>
              
              <h3 className="text-2xl font-black italic uppercase leading-none mb-4 group-hover:text-yellow-500 transition-colors">
                {r.title}
              </h3>
              
              <p className="text-zinc-400 text-sm font-bold italic leading-relaxed mb-8">
                {r.desc}
              </p>

              <div className="mt-auto">
                <Button 
                  variant="secondary" 
                  className="w-full py-4 text-[10px] font-black uppercase skew-x-[-15deg] bg-zinc-800 text-white border-none group-hover:bg-yellow-500 group-hover:text-black transition-all"
                >
                  Decrypt Full Log
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Branding */}
      <footer className="mt-12 py-8 border-t border-zinc-900 flex justify-between items-center px-4">
        <p className="text-zinc-700 font-black text-[9px] uppercase tracking-widest italic">Property of Team Pendragon. System Status: Apex.</p>
        <div className="h-1 w-24 bg-zinc-900"></div>
      </footer>
    </div>
  );
};

export default ArticlePage;