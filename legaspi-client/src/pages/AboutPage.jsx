import Button from '../components/Button';

// Updated image imports (using canonical naming for clarity in data)
import ShiguruImg from '../assets/styles/Shiguru Nanairo.jpg';
import ChromeImg from '../assets/styles/Chrome Ryugu.jpg';
import JaxonImg from '../assets/styles/Jaxon Cross x.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-24 p-4 md:p-12 bg-zinc-950 min-h-screen">
      {/* SECTION 1: THE SUMMIT MANIFESTO - Enhanced padding/depth */}
      <section className="relative border-[12px] border-zinc-900 bg-white p-10 md:p-24 shadow-[25px_25px_0_0_#d4af37] rounded-[1rem]">
        {/* Status Tag */}
        <div className="absolute -top-6 left-10 bg-zinc-900 text-white px-8 py-3 font-black italic uppercase text-xs skew-x-[-15deg] border-b-4 border-yellow-500 shadow-[4px_4px_0_0_#000]">
          Apex Status // Verified Roster // {new Date().getFullYear()}
        </div>
        
        <h1 className="text-7xl md:text-[11rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-12 text-zinc-900">
          THE <br /> <span className="text-yellow-500">PENDRAGON</span> <br /> WAY.
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-2xl md:text-3xl font-bold text-zinc-600 leading-tight italic border-l-8 border-yellow-500 pl-8">
            "Winning isn't a goal; it's a mechanical requirement. We are the only team that defines the 100th Floor."
          </p>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-4">Base Operations: X-Tower Summit</p>
            <Button to="/" variant="primary" className="bg-zinc-900 text-white border-none h-18 text-xl skew-x-[-10deg] flex items-center justify-center font-black uppercase hover:bg-zinc-700">
              Return to Base // Terminal Main
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: VERIFIED ROSTER DATABASE - The new enhanced character section */}
      <section className="w-full flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
            <h2 className="text-white border-none p-0 text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white m-0">
               Apex Lineup // The Elite Guard
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-wider">Active Link</span>
              <div className="h-2 w-24 bg-yellow-500 skew-x-[-20deg]"></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { name: "Shiguru Nanairo", role: "Technical Genius", gear: "Weiss Tiger", img: ShiguruImg, bio: "Calculates the path of absolute play. Maintains 0.1% recruitment friction standards." },
            { name: "Chrome Ryugu", role: "The King // Reigning Champ", gear: "Cobalt Drake", img: ChromeImg, bio: "Absolute summit dominance. Velocity limits are purely theoretical." },
            { name: "Jaxon Cross", role: "The Legend // Apex Prototype", gear: "Dran Sword", img: JaxonImg, bio: "The foundation of the 100th Floor. His X-Dash analysis set the pro-league standard." }
          ].map((member, i) => (
            <article key={i} className="group relative bg-zinc-900 border-4 border-zinc-900/50 hover:border-yellow-500 rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-[10px_10px_0_0_#000]">
              
              {/* Header: Name and Role */}
              <div className="p-8 pb-6 border-b border-zinc-800">
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] italic">{member.role}</span>
                <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter mt-1">{member.name}</h3>
              </div>
              
              {/* Character Image Area */}
              <div className="relative aspect-[3/4] bg-zinc-950 flex items-center justify-center p-6 border-b-8 border-yellow-500 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80 z-10"></div>
                 <img 
                    src={member.img} 
                    alt={member.name} 
                    className="relative z-20 w-full h-full object-contain filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                 />
                 {/* Decorative Overlay */}
                 <span className="absolute bottom-6 left-8 z-30 font-black italic text-8xl text-zinc-900/30 uppercase tracking-tighter rotate-[-15deg] opacity-60">PEND</span>
              </div>
              
              {/* Bio and Gear Data */}
              <div className="p-8">
                <p className="text-zinc-400 font-bold italic leading-relaxed text-sm mb-6 border-l-4 border-zinc-800 pl-4">{member.bio}</p>
                
                <div className="flex items-center gap-4 bg-zinc-950/50 p-4 border border-zinc-800">
                   <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">PRIMARY GEAR // APEX TIER</span>
                   <div className="h-0.5 flex-grow bg-zinc-800"></div>
                   <span className="text-white font-black italic text-sm text-right uppercase">{member.gear}</span>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: TECHNICAL SUPERIORITY - Grid refined */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-zinc-900 text-white p-16 rounded-[3rem] border-b-[16px] border-yellow-500 shadow-[15px_15px_0_0_#000]">
          <h2 className="text-white border-none p-0 text-4xl mb-8 font-black italic uppercase tracking-tighter">0.1% RECRUITMENT <span className="text-yellow-500">//</span></h2>
          <p className="text-zinc-400 text-xl leading-relaxed font-medium italic border-l-4 border-zinc-800 pl-6">
            We don't scout for talent; we scout for friction-control and X-Dash sustainability. Our roster is a hand-picked trio of bladers capable of maintaining 100% output at all times.
          </p>
        </div>
        
        <div className="bg-white border-4 border-zinc-900 p-16 rounded-[3rem] shadow-[15px_15px_0_0_#000] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
          <div className="text-center relative z-10">
            <span className="text-[12rem] md:text-[16rem] font-black italic text-zinc-900 leading-none">100</span>
            <p className="font-black uppercase tracking-[0.6em] text-yellow-600 mt-2 text-sm italic">The Apex Standard // Floor</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Footer Bar */}
      <footer className="w-full flex items-center justify-between border-t-2 border-zinc-800 p-6 px-10">
          <p className="text-zinc-700 font-bold uppercase text-[9px] tracking-widest italic">Property of Team Pendragon // X-Tower Level 100</p>
          <div className="h-1 w-24 bg-yellow-500/30"></div>
      </footer>
    </div>
  );
};

export default AboutPage;