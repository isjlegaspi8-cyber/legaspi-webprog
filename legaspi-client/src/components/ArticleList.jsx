import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.name}
          className="group flex flex-col rounded-[2rem] border-4 border-zinc-900 bg-zinc-900/50 overflow-hidden transition hover:border-yellow-500"
        >
          <div className="flex-1 p-8">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-yellow-500">
              System Archive
            </p>
            <h3 className="mb-4 text-2xl font-black italic uppercase text-white tracking-tight">
              {article.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{article.content[0]}</p>
          </div>

          <div className="border-t border-zinc-800 bg-zinc-950 p-6">
            <Link
              to={`/articles/${article.name}`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 transition hover:bg-white"
            >
              Read Full Report
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
