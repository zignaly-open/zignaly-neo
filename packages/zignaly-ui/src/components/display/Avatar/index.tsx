// Dependencies
import React, { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";

// Styles
import { sizes, Image, JazzIcon, Layout } from "./styles";

// Types
import { AvatarSizes, AvatarTypeProps } from "./types";

const Avatar = ({ size = AvatarSizes.MEDIUM, hash, image }: AvatarTypeProps) => {
  // Refs
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
    <Layout className={size as string} data-testid="avatar-view">
      {image ? <Image src={image} /> : <JazzIcon data-testid="icon-input" ref={jazzIconRef} />}
    </Layout>
  );
};

export { AvatarSizes };
export default Avatar;
