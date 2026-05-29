import React from 'react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 p-6 text-center">
      <div className="relative border-[10px] border-zinc-900 bg-zinc-900 p-12 shadow-[20px_20px_0_0_#eab308] rounded-2xl">
        <span className="text-[10rem] font-black italic text-white leading-none block drop-shadow-[8px_8px_0_#000]">
          404
        </span>
        <h1 className="text-4xl font-black italic uppercase text-yellow-500 mt-4 tracking-tighter"
            style={{ WebkitTextFillColor: '#eab308', background: 'none' }}>
          Signal Lost // Link Broken
        </h1>
        <p className="mt-6 text-zinc-400 font-bold italic max-w-sm mx-auto leading-tight">
          The coordinate you followed does not exist on the 100th Floor database.
        </p>
        <div className="mt-10 flex justify-center">
          <Button to="/" className="bg-yellow-500 !text-black border-none h-16 px-12 text-lg skew-x-[-12deg] font-black uppercase shadow-[6px_6px_0_0_#000] hover:bg-white transition-all">
            Return to Command Center
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;