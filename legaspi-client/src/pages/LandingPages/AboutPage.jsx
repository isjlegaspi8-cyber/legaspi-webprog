import Button from '../../components/Button';

// Exact image imports maintained
import ShiguruImg from '../../assets/Shiguru Nanairo.png';
import ChromeImg from '../../assets/Chrome Ryugu.png';
import JaxonImg from '../../assets/Jaxon Cross x.png';

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
      <section className="w-full flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 px-4">
            <h2 className="text-white border-none p-0 text-5xl md:text-6xl font-black italic uppercase tracking-tighter m-0 text-center">
               Apex Lineup // <span className="text-yellow-500">The Elite Guard</span>
            </h2>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Active Link</span>
              <div className="h-2 w-24 bg-yellow-500 skew-x-[-20deg]"></div>
            </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto w-full items-stretch">
          {[
            { name: "Shiguru Nanairo", role: "Technical Genius", gear: "Weiss Tiger", img: ShiguruImg, bio: "Calculates the path of absolute play. Maintains 0.1% recruitment friction standards." },
            { name: "Chrome Ryugu", role: "The King // Reigning Champ", gear: "Cobalt Drake", img: ChromeImg, bio: "Absolute summit dominance. Velocity limits are purely theoretical." },
            { name: "Jaxon Cross", role: "The Legend // Apex Prototype", gear: "Dran Sword", img: JaxonImg, bio: "The foundation of the 100th Floor. His X-Dash analysis set the pro-league standard." }
          ].map((member, i) => (
            <article key={i} className="relative bg-black border border-black rounded-[2rem] overflow-hidden shadow-[12px_12px_0_0_#000] flex flex-col h-full">
              <div className="relative z-10 flex flex-col flex-1">
                <div className="h-72 md:h-80 bg-black overflow-hidden flex items-center justify-center">
                  <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                </div>

                <div className="p-8 flex flex-col gap-5 bg-yellow-500 flex-1">
                  <div>
                    <span className="text-yellow-700 font-black text-[10px] uppercase tracking-[0.3em] italic">{member.role}</span>
                    <h3 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tight mt-3 leading-tight">{member.name}</h3>
                  </div>
                  <p className="text-yellow-800 italic leading-relaxed text-sm border-l-4 border-yellow-800 pl-4">{member.bio}</p>
                  <div className="mt-auto flex items-center gap-4 bg-yellow-700 p-4">
                     <span className="text-yellow-900 font-bold text-[11px] uppercase tracking-wider">PRIMARY GEAR</span>
                     <div className="h-0.5 flex-grow bg-yellow-800"></div>
                     <span className="text-white font-black italic text-sm uppercase">{member.gear}</span>
                  </div>
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
    </div>
  );
};

export default AboutPage;
