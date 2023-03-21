import React, { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import { sizes, Image, JazzIcon, Layout } from "./styles";

import { AvatarSizes, AvatarTypeProps } from "./types";

const Avatar = ({ size = AvatarSizes.MEDIUM, hash, image, alt, id }: AvatarTypeProps) => {
  const jazzIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!image && jazzIconRef.current && hash) {
      jazzIconRef.current.innerHTML = "";
      jazzIconRef.current.appendChild(
        Jazzicon(sizes[size as AvatarSizes], parseInt(hash.slice(2, 10), 16)),
      );
    }
  }, [image, hash, size]);

  return (
    <Layout className={size as string} data-testid="avatar-view" id={id}>
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
