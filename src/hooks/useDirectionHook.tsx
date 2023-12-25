import { useEffect, useState } from "react";

const useDirectionHook = (breakpoint: number) => {
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "vertical",
  );
  useEffect(() => {
    const handleResize = () => {
      const newDirection =
        window.innerWidth < breakpoint ? "horizontal" : "vertical";
      setDirection(newDirection);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return direction;
};
export default useDirectionHook;
