import React, { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import { sizes, Image, JazzIcon, Layout } from "./styles";

import { AvatarSizes, AvatarTypeProps } from "./types";

const Avatar = ({ size = AvatarSizes.MEDIUM, hash, image, alt, id }: AvatarTypeProps) => {
  const jazzIconRef = useRef<HTMLDivElement>(null);
  const sizeVal = typeof size === "number" ? size : sizes[size as AvatarSizes];

  useEffect(() => {
    if (!image && jazzIconRef.current && hash) {
      jazzIconRef.current.innerHTML = "";
      jazzIconRef.current.appendChild(Jazzicon(sizeVal, parseInt(hash.slice(2, 10), 16)));
    }
  }, [image, hash, size]);

  return (
    <Layout size={sizeVal} data-testid="avatar-view" id={id}>
      {image ? (
        <Image src={image} alt={alt} />
      ) : (
        <JazzIcon data-testid="icon-input" ref={jazzIconRef} />
      )}
    </Layout>
  );
};

export { AvatarSizes };
export default Avatar;
