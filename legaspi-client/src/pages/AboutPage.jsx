import Button from '../components/Button';

// Exact image imports maintained
import ShiguruImg from '../assets/Shiguru Nanairo.png';
import ChromeImg from '../assets/Chrome Ryugu.png';
import JaxonImg from '../assets/Jaxon Cross x.png';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-24 p-4 md:p-12 bg-zinc-950 min-h-screen">
      
      {/* SECTION 1: THE SUMMIT MANIFESTO */}
      {/* FIXED: bg-zinc-900 with a border makes it pop against the zinc-950 body */}
      <section className="relative border-[12px] border-zinc-800 bg-zinc-900 p-10 md:p-24 shadow-[25px_25px_0_0_#d4af37] rounded-[1rem]">
        
        {/* Status Tag */}
        <div className="absolute -top-6 left-10 bg-black text-white px-8 py-3 font-black italic uppercase text-xs skew-x-[-15deg] border-b-4 border-yellow-500 shadow-[4px_4px_0_0_#000]">
          Apex Status // Verified Roster // {new Date().getFullYear()}
        </div>
        
        {/* FIXED H1: We use style={{WebkitTextFillColor: 'white'}} to override your index.css transparent fill */}
        <h1 
          className="text-7xl md:text-[11rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-12"
          style={{ WebkitTextFillColor: 'white', background: 'none' }}
        >
          THE <br /> 
          <span className="text-yellow-500" style={{ WebkitTextFillColor: '#eab308' }}>
            PENDRAGON
          </span> <br /> 
          WAY.
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* text-zinc-100 ensures the quote is bright silver/white */}
          <p className="text-2xl md:text-3xl font-black text-zinc-100 leading-tight italic border-l-8 border-yellow-500 pl-8">
            "Winning isn't a goal; it's a mechanical requirement. We are the only team that defines the 100th Floor."
          </p>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-xs font-black text-zinc-500 uppercase tracking-widest pl-4">Base Operations: X-Tower Summit</p>
            
            {/* FIXED BUTTON: Solid background, visible text */}
            <Button 
              to="/" 
              className="bg-yellow-500 !text-black border-none h-18 text-xl skew-x-[-10deg] flex items-center justify-center font-black uppercase hover:bg-white transition-all shadow-[6px_6px_0_0_#000]"
            >
              Return to Base // Terminal Main
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: VERIFIED ROSTER DATABASE */}
      <section className="w-full flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
            <h2 className="text-white border-none p-0 text-5xl md:text-6xl font-black italic uppercase tracking-tighter m-0">
               Apex Lineup // <span className="text-yellow-500">The Elite Guard</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Active Link</span>
              <div className="h-2 w-24 bg-yellow-500 skew-x-[-20deg]"></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { name: "Shiguru Nanairo", role: "Technical Genius", gear: "Weiss Tiger", img: ShiguruImg, bio: "Calculates the path of absolute play. Maintains 0.1% recruitment friction standards." },
            { name: "Chrome Ryugu", role: "The King // Reigning Champ", gear: "Cobalt Drake", img: ChromeImg, bio: "Absolute summit dominance. Velocity limits are purely theoretical." },
            { name: "Jaxon Cross", role: "The Legend // Apex Prototype", gear: "Dran Sword", img: JaxonImg, bio: "The foundation of the 100th Floor. His X-Dash analysis set the pro-league standard." }
          ].map((member, i) => (
            <article key={i} className="group relative bg-zinc-900 border-4 border-zinc-800 hover:border-yellow-500 rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-[10px_10px_0_0_#000]">
              <div className="p-8 pb-6 border-b border-zinc-800">
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] italic">{member.role}</span>
                <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter mt-1">{member.name}</h3>
              </div>
              
              <div className="relative aspect-[3/4] bg-zinc-950 flex items-center justify-center p-6 border-b-8 border-yellow-500 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90 z-10"></div>
                 <img src={member.img} alt={member.name} className="relative z-20 w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
                 <span className="absolute bottom-6 left-8 z-0 font-black italic text-8xl text-white/5 uppercase tracking-tighter rotate-[-15deg]">PEND</span>
              </div>
              
              <div className="p-8">
                <p className="text-zinc-400 font-bold italic leading-relaxed text-sm mb-6 border-l-4 border-zinc-800 pl-4">{member.bio}</p>
                <div className="flex items-center gap-4 bg-black/40 p-4 border border-zinc-800">
                   <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">PRIMARY GEAR</span>
                   <div className="h-0.5 flex-grow bg-zinc-800"></div>
                   <span className="text-white font-black italic text-sm text-right uppercase">{member.gear}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: TECHNICAL SUPERIORITY */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-zinc-900 p-16 rounded-[3rem] border-b-[16px] border-yellow-500 shadow-[15px_15px_0_0_#000]">
          <h2 className="text-white border-none p-0 text-4xl mb-8 font-black italic uppercase tracking-tighter">0.1% RECRUITMENT <span className="text-yellow-500">//</span></h2>
          <p className="text-zinc-300 text-xl leading-relaxed font-bold italic border-l-4 border-yellow-500/50 pl-6">
            We don't scout for talent; we scout for friction-control and X-Dash sustainability.
          </p>
        </div>
        
        {/* FIXED: Swapped this to Zinc-900 to match the theme, white was too jarring */}
        <div className="bg-zinc-900 border-4 border-yellow-500 p-16 rounded-[3rem] shadow-[15px_15px_0_0_#000] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
          <div className="text-center relative z-10">
            <span className="text-[12rem] md:text-[16rem] font-black italic text-white leading-none drop-shadow-[8px_8px_0_#000]">100</span>
            <p className="font-black uppercase tracking-[0.6em] text-yellow-600 mt-2 text-sm italic">The Apex Standard // Floor</p>
          </div>
        </div>
      </div>
      
      <footer className="w-full flex items-center justify-between border-t-2 border-zinc-900 p-10 mt-10">
          <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.3em] italic">Property of Team Pendragon // Level 100 Verified</p>
          <div className="h-1 w-32 bg-yellow-500/20"></div>
      </footer>
    </div>
  );
};

export default AboutPage;