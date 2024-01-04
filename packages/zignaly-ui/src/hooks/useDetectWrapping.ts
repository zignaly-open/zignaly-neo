import { useEffect, useState } from "react";

export const useDetectWrapping = (containerRef: React.RefObject<HTMLElement>) => {
  const [wrap, setWrap] = useState(false);

  useEffect(() => {
    const detectWrap = () => {
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

    detectWrap();

    window.addEventListener("resize", detectWrap);

    return () => {
      window.removeEventListener("resize", detectWrap);
    };
  }, []);

  return wrap;
};

export default useDetectWrapping;
