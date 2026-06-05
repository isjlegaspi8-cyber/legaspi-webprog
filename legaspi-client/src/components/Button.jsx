import { Link } from 'react-router-dom';

const Button = ({
  to,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center px-10 py-5 text-base font-black uppercase italic tracking-[0.15em] transition-all duration-300 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none skew-x-[-12deg] border-[4px] overflow-hidden group";

  const variants = {
    primary:
      "bg-yellow-500 border-zinc-900 text-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-zinc-900 hover:shadow-[8px_8px_0px_0px_rgba(212,175,55,1)]",
    secondary:
      "bg-zinc-950 border-zinc-900 text-white shadow-[8px_8px_0px_0px_rgba(212,175,55,1)] hover:bg-yellow-500 hover:text-zinc-900 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    outline:
      "bg-transparent border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const ButtonContent = () => (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></span>
      <span className="relative z-10">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={combinedClassName} {...props}>
      <ButtonContent />
    </button>
  );
};

export default Button;