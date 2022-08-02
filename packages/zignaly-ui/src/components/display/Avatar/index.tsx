// Dependencies
import React, { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";

// Styles
import { sizes, Image, JazzIcon, Layout } from "./styles";

// Types
import { AvatarSizes, AvatarTypeProps } from "./types";

const Avatar = ({ size = AvatarSizes.MEDIUM, hash, image }: AvatarTypeProps) => {
  // Refs
  const jazzIconRef = useRef(null);

  useEffect(() => {
    if (!image && jazzIconRef.current && hash) {
      // @ts-ignore
      jazzIconRef.current.innerHTML = "";
      // @ts-ignore
      jazzIconRef.current.appendChild(Jazzicon(sizes[size], parseInt(hash.slice(2, 10), 16)));
    }
  }, [image, hash, size]);

  return (
    <Layout className={size} data-testid="avatar-view">
      {image ? <Image src={image} /> : <JazzIcon data-testid="icon-input" ref={jazzIconRef} />}
    </Layout>
  );
};

export { AvatarSizes };
export default Avatar;
