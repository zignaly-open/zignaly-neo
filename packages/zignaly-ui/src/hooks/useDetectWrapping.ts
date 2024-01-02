import { useEffect, useState } from "react";

const calculateVerticalMiddle = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.top + rect.height / 2;
};

const useDetectWrapping = (ref: React.RefObject<Element>) => {
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const checkWrap = () => {
      if (ref.current) {
        const children = Array.from(ref.current.children);
        const firstChild = children[0];
        const lastChild = children[children.length - 1];
        const middleOfFirst = calculateVerticalMiddle(firstChild);
        const middleOfLast = calculateVerticalMiddle(lastChild);
        console.log(middleOfFirst, middleOfLast);

        setIsWrapped(middleOfFirst !== middleOfLast);
      }
    };

    checkWrap(); // Check initially

    const resizeHandler = () => {
      checkWrap(); // Check on window resize
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [ref]);

  return isWrapped;
};

export default useDetectWrapping;
