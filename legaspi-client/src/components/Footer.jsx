import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t-2 border-zinc-900 bg-zinc-950 p-8 text-white">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-yellow-500"></div>
            <span className="font-black italic uppercase tracking-tighter">Pendragon Protocol</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 italic">
            Apex Status // Floor 100 Verified
          </p>
        </div>
        <p className="text-[10px] font-black uppercase text-zinc-400">
          © {new Date().getFullYear()} All Rights Reserved // System Authority
        </p>
      </div>
    </footer>
  );
};

export default Footer;