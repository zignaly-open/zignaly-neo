// Dependencies
import React, { useEffect, useRef } from "react";
// @ts-ignore
import Jazzicon from "@metamask/jazzicon";

// Types
import { sizeTypesId } from "types/sizes";

// Styles
import * as styled from "./styles";

const Avatar = ({
  size = sizeTypesId.MEDIUM,
  hash,
  image,
}: {
  size: sizeTypesId;
  hash?: string;
  image?: string;
}) => {
  // Refs
  const jazzIconRef = useRef(null);

  useEffect(() => {
    if (!image && jazzIconRef.current && hash) {
      // @ts-ignore
      jazzIconRef.current.innerHTML = "";
      // @ts-ignore
      jazzIconRef.current.appendChild(
        Jazzicon(styled.sizes[size], parseInt(hash.slice(2, 10), 16)),
      );
    }
  }, [image, hash, size]);

  return (
    <styled.Layout className={size} data-testid="avatar-view">
      {image ? (
        <styled.Image src={image} />
      ) : (
        <styled.JazzIcon data-testid="icon-input" ref={jazzIconRef} />
      )}
    </styled.Layout>
  );
};

export default Avatar;
