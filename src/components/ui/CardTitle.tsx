type CardTitlePropsType = {
  children: React.ReactNode;
  className?: string;
};
const CardTitle = ({ children, className }: CardTitlePropsType) => {
  return <h1 className={`text-xl font-bold mb-6 ${className}`}>{children}</h1>;
};
export default CardTitle;
