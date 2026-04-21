import React from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../assets/styles/article-content';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-12 bg-zinc-950 min-h-screen text-white">
      <section className="border-b-4 border-zinc-900 bg-zinc-950 px-6 py-12 md:px-12 md:py-20">
        <div className="mb-8 border-l-8 border-yellow-500 pl-8">
          <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-zinc-500">System Archives</p>
          <h1 className="max-w-xl text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight">
            Featured <span className="text-yellow-500">Intelligence</span>
          </h1>
        </div>
        <div className="mt-10">
          <Button to="/" className="bg-zinc-100 !text-black border-none px-10 py-4 font-black uppercase skew-x-[-12deg]">
            Back Home
          </Button>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;