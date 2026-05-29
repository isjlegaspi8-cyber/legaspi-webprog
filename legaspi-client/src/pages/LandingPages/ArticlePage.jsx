import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/styles/article-content'; 

// Import your PNG assets
import CobaltDrakeImg from '../../assets/CobaltDrake.png';
import WeissTigerImg from '../../assets/WeissTiger.png';
import DranSwordImg from '../../assets/DranSword.png';

// Beyblade images array
const beybladeImages = [CobaltDrakeImg, WeissTigerImg, DranSwordImg];

// Move reports outside to prevent memory leaks and lagging
const reports = [
  { id: "LOG-001", bey: "Cobalt Drake", img: CobaltDrakeImg, title: "Bit Friction & Velocity Logs", author: "Chrome Ryugu", desc: "Technical friction analysis at maximum output." },
  { id: "LOG-002", bey: "Weiss Tiger", img: WeissTigerImg, title: "The Technical Intercept Protocol", author: "Shiguru Nanairo", desc: "Optimized Weiss Tiger interception maneuvers." },
  { id: "LOG-003", bey: "Dran Sword", img: DranSwordImg, title: "The X-Dash Prototype Study", author: "Jaxon Cross", desc: "Legacy engineering study on the first functional X-Dash." }
];

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);

  if (article) {
    return (
      <div className="flex w-full flex-col gap-10 p-4 md:p-12 bg-zinc-950 min-h-screen text-white">
        <section className="bg-zinc-900 p-10 border-b-[8px] border-yellow-500 rounded-t-[2rem]">
          <Button to="/articles" className="mb-6 !text-zinc-500 text-[10px] font-black uppercase">← Back to Archives</Button>
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-4">{article.title}</h1>
        </section>
        <div className="max-w-4xl mx-auto space-y-8 py-10">
          {article.name === 'beyblades-team-pendragon' ? (
            article.content.map((p, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                <div className="flex-shrink-0">
                  <img 
                    src={beybladeImages[i]} 
                    alt={p.split(':')[0]} 
                    className="w-32 h-32 object-contain" 
                  />
                </div>
                <p className="text-lg text-zinc-300 font-bold italic leading-relaxed">{p}</p>
              </div>
            ))
          ) : (
            article.content.map((p, i) => (
              <p key={i} className="text-lg text-zinc-300 font-bold italic leading-relaxed border-l-4 border-zinc-900 pl-8">{p}</p>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10 p-4 md:p-12 bg-zinc-950 min-h-screen text-white">
      <section className="bg-zinc-900 p-10 border-b-[8px] border-yellow-500 rounded-t-[2rem]">
        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
          CHAMPION <span className="text-yellow-500 font-black">ARCHIVES.</span>
        </h1>
        <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Team Pendragon Secure Database</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reports.map((r) => (
          <article key={r.id} className="group flex flex-col border-4 border-zinc-900 bg-zinc-900/50 hover:border-yellow-500 transition-all duration-300 rounded-3xl overflow-hidden">
            <div className="relative aspect-square bg-zinc-950 flex items-center justify-center p-8">
              <img 
                src={r.img} 
                alt={r.bey} 
                loading="lazy" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="p-8 flex flex-col flex-grow bg-zinc-900">
              <h3 className="text-2xl font-black italic uppercase mb-4">{r.title}</h3>
              <p className="text-zinc-400 text-sm font-bold italic leading-relaxed mb-8">{r.desc}</p>
              <Button to="/articles" className="mt-auto w-full py-4 text-[10px] font-black uppercase bg-zinc-800 hover:bg-yellow-500 hover:text-black">Decrypt Log</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
