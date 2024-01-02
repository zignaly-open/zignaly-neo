import { useEffect, useState } from "react";

export const useDetectWrapping = (containerRef: React.RefObject<HTMLElement>) => {
  const [wrap, setWrap] = useState(false);

  useEffect(() => {
    const calculateWidth = () => {
      const children = containerRef.current?.children;
      if (children) {
        const totalChildrenWidth = Array.from(children).reduce(
          (acc, child) => acc + child.clientWidth,
          0,
        );
        const containerWidth = containerRef.current?.offsetWidth ?? 0;
        const remainingWidth = containerWidth - totalChildrenWidth;
        setWrap(remainingWidth < 0);
      }
    };

    calculateWidth(); // Initial calculation

    const resizeHandler = () => {
      calculateWidth(); // Recalculate on window resize
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return wrap;
};

export default useDetectWrapping;
