type CardTitlePropsType = {
  children: React.ReactNode;
  className?: string;
};
const Description = ({ children, className }: CardTitlePropsType) => {
  return (
    <h1 className={`text-sm font-bold mb-1 text-slate-400 ${className}`}>
      {children}
    </h1>
  );
};
export default Description;
