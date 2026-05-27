const CardItem = ({ children }) => {
  return (
    <div className="rounded-[2rem] border border-yellow-500/20 bg-[#08101f] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1">
      {children}
    </div>
  );
};

export default CardItem;
