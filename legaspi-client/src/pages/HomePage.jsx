import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-24 pb-20 bg-zinc-950">
      {/* SECTION 1: HERO - THE SUMMIT GATE */}
      <section className="relative min-h-[85vh] flex items-center border-b-[12px] border-zinc-900 bg-zinc-950 px-6 py-24 md:px-12 md:py-40 text-white overflow-hidden">
        {/* Animated Speed Lines - Background Layer */}
        <div className="speed-line top-1/4 left-0 opacity-20 pointer-events-none"></div>
        <div className="speed-line top-1/2 left-0 opacity-15 pointer-events-none" style={{ animationDelay: '1s' }}></div>
        <div className="speed-line top-3/4 left-0 opacity-10 pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        {/* Visual Decoration - Horizontal Gold Accent */}
        <div className="absolute top-1/2 right-0 w-1/2 h-1 bg-yellow-500 skew-y-[-12deg] opacity-30 blur-sm"></div>
        
        <div className="relative z-20 w-full">
          {/* NAV-STYLE BRANDING: Matches the NavBar layout */}
          <div className="flex flex-col gap-2 mb-12">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1.5 bg-yellow-500"></div>
              <span className="bg-yellow-500 text-black px-4 py-1 text-[10px] font-black uppercase skew-x-[-15deg]">
                Pro League Status
              </span>
            </div>
            <p className="text-[12px] md:text-sm font-black uppercase tracking-[0.5em] text-zinc-500 italic pl-6">
              Apex // Floor 100
            </p>
          </div>
          
          <h1 className="max-w-6xl text-6xl md:text-[10rem] font-black italic uppercase leading-[0.9] tracking-tighter mb-16">
            PENDRAGON <br /> 
            <span className="text-yellow-500 font-black">DOMINATION.</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="max-w-xl text-lg md:text-2xl font-bold text-zinc-300 leading-snug border-l-8 border-yellow-500 pl-8 italic">
              Where Chrome Ryugu and Shiguru Nanairo maintain the absolute peak. We don't just win; we set the standard that the world follows.
            </p>
            <div className="flex justify-start md:justify-end">
              <Button to="/articles" variant="primary" className="h-24 w-full md:w-80 bg-yellow-500 border-none text-zinc-900 text-xl font-black uppercase skew-x-[-12deg] shadow-[10px_10px_0_0_#000] hover:bg-white hover:translate-x-2 transition-all">
                Claim Victory Data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="px-6 md:px-12 relative z-30 -mt-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { label: "Current Rank", val: "#01", theme: "bg-white text-zinc-900" },
            { label: "Win Streak", val: "UNBROKEN", theme: "bg-yellow-500 text-zinc-900" },
            { label: "Gear Tier", val: "APEX", theme: "bg-white text-zinc-900" }
          ].map((stat, i) => (
            <div key={i} className={`rounded-[2.5rem] border-4 border-zinc-900 p-12 shadow-[12px_12px_0_0_#000] ${stat.theme} transform transition-transform hover:scale-105`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-4">{stat.label}</h4>
              <p className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE ELITE GUARD */}
      <section className="px-6 md:px-12 mt-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="m-0 border-none p-0 text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            The Elite Guard
          </h2>
          <div className="h-3 w-64 bg-yellow-500 skew-x-[-20deg]"></div>
        </div>
        
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { name: "Chrome Ryugu", bey: "Cobalt Drake", role: "The King", color: "from-blue-600 to-blue-900" },
            { name: "Shiguru Nanairo", bey: "Weiss Tiger", role: "Technical Genius", color: "from-zinc-700 to-zinc-900" },
            { name: "Jaxon Cross", bey: "Dran Sword", role: "The Legend", color: "from-yellow-500 to-yellow-700" }
          ].map((member, i) => (
            <article key={i} className="group relative rounded-[3rem] border-4 border-zinc-900 bg-white p-8 shadow-[15px_15px_0_0_#d4af37] hover:translate-y-[-15px] transition-all duration-500">
              <div className={`h-64 w-full rounded-[2rem] bg-gradient-to-br ${member.color} flex items-center justify-center overflow-hidden relative border-4 border-black/20`}>
                 <span className="absolute inset-0 opacity-10 text-white font-black text-[12rem] -rotate-12 italic uppercase leading-none select-none">
                   {member.name.split(' ')[0]}
                 </span>
                 <div className="relative z-10 flex flex-col items-center text-center">
                   <span className="relative z-20 text-white font-black italic text-3xl tracking-tighter border-b-4 border-yellow-400 pb-2 uppercase">
                     {member.bey}
                   </span>
                 </div>
              </div>
              <div className="mt-10">
                <p className="text-xs font-black text-yellow-600 uppercase tracking-widest italic mb-2">{member.role}</p>
                <h3 className="text-4xl font-black italic uppercase text-zinc-900 leading-tight">{member.name}</h3>
                <div className="mt-8 h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden border-2 border-zinc-900/5">
                  <div className="h-full bg-zinc-900 w-[100%] group-hover:bg-yellow-500 transition-all duration-700"></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;